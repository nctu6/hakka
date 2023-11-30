import originContent from '../assets/content.txt'

export const parsingFunctionMixin = {
    data() {
        return {
            articles: [],
        }
    },
    mounted() {
        this.parseOriginContent();
    },
    methods:
    {
        formatTextAndUrl(text) {
            const urlRegex = /(https?:\/\/[^\s]+)/;
            // const emailRegex = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; // eslint-disable-line
            const emailRegex = /(\b[A-Za-z0-9._%+-]+[@＠][A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/;
            let parts = text.split(new RegExp(`${urlRegex.source}|${emailRegex.source}`)).filter(part => part);
            return parts.map(part => {
                if (urlRegex.test(part)) {
                    return { type: 'link', content: part };
                } else if (emailRegex.test(part)) {
                    return { type: 'email', content: part };
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

        parseOriginContent() {
            const articleSections = originContent.split('標題：'); // 根據標題分割
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
                        const mediaMatch = line.match(/(圖片|影片)：\s*([\w-]+\.(jpg|jpeg|png|gif|bmp|wav|mp4|avi|mov|mpeg|mpg))(?:\s*\((.*?)\))?/
                        );
                        if (mediaMatch) {
                            const type = mediaMatch[1] === '圖片' ? 'image' : 'video';
                            const filename = mediaMatch[2];
                            const description = mediaMatch[4] ? mediaMatch[4].trim() : '';

                            contentItems.push({ type: type, content: filename });

                            if (description) {
                                contentItems.push({ type: 'caption', content: description });
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
    }
}
