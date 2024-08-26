import originContent from '../assets/content.txt'

export const parsingFunctionMixin = {
    data() {
        return {
            articles: [],
            assetMap: new Map()
        }
    },
    async created() {
        await this.initAssetMap();
        await this.loadAndParseContent();
    },
    methods: {
        async initAssetMap() {
            try {
                const imgContext = require.context('../assets/', false, /\.(jpg|jpeg|png|gif|svg)$/);
                const audioContext = require.context('../assets/', false, /\.(mp3|wav|ogg|m4a|mp4)$/);

                const processContext = (context) => {
                    context.keys().forEach(key => {
                        const fileName = key.replace('./', '');
                        const nameWithoutExt = this.getFileNameWithoutExtension(fileName);
                        this.assetMap.set(nameWithoutExt.toLowerCase(), fileName);
                    });
                };
                processContext(imgContext);
                processContext(audioContext);

            } catch (error) {
                console.error("Error initializing asset map:", error);
            }
        },

        getFileNameWithoutExtension(fileName) {
            return fileName.split('.').slice(0, -1).join('.');
        },

        getCorrectFileName(fileName) {
            const nameWithoutExt = this.getFileNameWithoutExtension(fileName).toLowerCase();
            const correctFileName = this.assetMap.get(nameWithoutExt);
            if (correctFileName) {
                return correctFileName;
            }
            // 如果在 assetMap 中找不到，返回原始文件名
            return fileName;
        },

        async loadAndParseContent() {
            try {
                let content = await this.fixFileExtensions(originContent);
                this.parseContent(content);
            } catch (error) {
                console.error('Error parsing content:', error);
            }
        },

        async fixFileExtensions(content) {
            const lines = content.split('\n');
            const fixedLines = lines.map(line => {
                const match = line.match(/(圖片|音檔)：\s*(.+?)(?=\s*$)/);
                if (match) {
                    const [fullMatch, type, fileName] = match;
                    const trimmedFileName = fileName.trim();
                    const correctedFileName = this.getCorrectFileName(trimmedFileName);
                    if (correctedFileName !== trimmedFileName) {
                        return line.replace(fullMatch, `${type}：${correctedFileName}`);
                    }
                }
                return line;
            });
            const result = fixedLines.join('\n');
            console.log("Fixed content:", result); // 調試用
            return result;
        },

        parseContent(content) {
            const articleSections = content.split('標題：'); // 根據標題分割
            articleSections.forEach(section => {
                if (section.trim() !== '') {
                    let oneArticle = {};

                    let data = this.extractContent(section, '封面圖片：');
                    oneArticle.title = data.extractedContent;
                    section = data.remainingSection;

                    data = this.extractContent(section, '封面作者：');
                    oneArticle.coverPicture = data.extractedContent;
                    section = data.remainingSection;

                    data = this.extractContent(section, '封面內容：');
                    oneArticle.coverAuthor = data.extractedContent;
                    section = data.remainingSection;

                    let coverContent = [];
                    data = this.extractContent(section, '作者：');
                    data.extractedContent.split('\n').forEach(line => {
                        coverContent.push(line.trim());
                    });
                    oneArticle.coverContent = coverContent;
                    section = data.remainingSection;

                    data = this.extractContent(section, '音檔：');
                    oneArticle.author = data.extractedContent;
                    section = data.remainingSection;

                    data = this.extractContent(section, '發音人：');
                    oneArticle.audio = data.extractedContent;
                    section = data.remainingSection;

                    data = this.extractContent(section, '文章內容：');
                    oneArticle.audioAuthor = data.extractedContent;
                    section = data.remainingSection;

                    // 处理文章内容
                    const contentItems = [];
                    section.split('\n').forEach(line => {
                        const mediaMatch = line.match(/(圖片|影片)：\s*([\w-]+\.(jpg|jpeg|png|gif|bmp|wav|mp4|avi|mov|mpeg|mpg))(?:\s*([（(].*[)）]))?/
                        );
                        if (mediaMatch) {
                            const type = mediaMatch[1] === '圖片' ? 'image' : 'video';
                            const filename = mediaMatch[2];
                            let description = mediaMatch[4] ? mediaMatch[4].trim().substring(1, mediaMatch[4].length - 1) : '';

                            contentItems.push({ type: type, content: filename });

                            if (description) {
                                // 检查description是否被#包围，并提取内容
                                const hashTagMatch = description.match(/^#(.+)#$/);
                                if (hashTagMatch) {
                                    description = hashTagMatch[1];
                                    // 如果description被#包围，提取被#包围的内容
                                    contentItems.push({ type: 'captionStrong', content: description });
                                } else {
                                    contentItems.push({ type: 'caption', content: description });
                                }
                            }
                        }
                        else {
                            var content = line;
                            content = this.formatTextAndUrl(content);
                            contentItems.push({ type: "text", content: content });

                            //     content.split('http').forEach(
                            //         c=> {

                            //         }
                            //     )
                            //     contentItems.push({ type: 'text', content: line.trim() });
                            // }
                        }
                        // else {
                        //     contentItems.push({ type: "text", content: " "});
                        // }
                    });
                    oneArticle.content = contentItems;
                    this.articles.push(oneArticle);
                    this.$emit('articles-loaded', this.articles);
                }
            });
        },
        formatTextAndUrl(text) {
            const urlRegex = /(https?:\/\/[^\s,，。！？；：）)]+)/;
            // const emailRegex = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; // eslint-disable-line
            const emailRegex = /(\b[A-Za-z0-9._%+-]+[@＠][A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/;
            const hashTagRegex = /(#[^#]+#)/;
            let parts = text.split(new RegExp(`${urlRegex.source}|${emailRegex.source}|${hashTagRegex.source}`)).filter(part => part);
            return parts.map(part => {
                if (urlRegex.test(part)) {
                    return { type: 'link', content: part };
                } else if (emailRegex.test(part)) {
                    return { type: 'email', content: part };
                } else if (hashTagRegex.test(part)) {
                    return { type: 'hashTag', content: part.slice(1, -1) };
                } else {
                    return { type: 'text', content: part };
                }
                // return {
                //     type: urlRegex.test(part) ? 'link' : 'text',
                //     content: part
                // };
            });
        },


        extractContent(section, delimiter) {
            const parts = section.split(delimiter);
            if (parts.length < 2) {
                return { remainingSection: section, extractedContent: '' };
            }
            return { remainingSection: parts[1], extractedContent: parts[0].trim() };
        },
    }
}
