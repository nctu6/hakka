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
                        const imageMatch = line.match(/圖片：\s*(image\d+-\d+\.jpg)(?:\s*\((.*?)\))?/);
                        if (imageMatch) {
                            contentItems.push({ type: 'image', content: imageMatch[1].trim() });
                            if (imageMatch[2]) {
                                contentItems.push({ type: 'caption', content: imageMatch[2].trim() });
                            }
                        } else if (line.trim() !== '') {
                            contentItems.push({ type: 'text', content: line.trim() });
                        }
                    });
                    oneArticle.content = contentItems;
                    this.articles.push(oneArticle);
                    this.$emit('articles-loaded', this.articles);
                }
            });
        },
    }
}
