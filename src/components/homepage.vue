<template>
    <div class="wrapper ">
        <div class="container-area ">

            <div class="row " v-for="(article, index) in articles" :key="index">
                <div class="col-sm-12 col-md-6">
                    <img :src="require(`@/assets/${article.coverPicture}`)" class="img-fluid img-block" alt="...">
                </div>

                <div class="col-sm-12 col-md-6">
                    <h6 class="cover-author">{{ article.coverAuthor }}</h6>
                    <h4 class="cover-title">{{ article.title }}</h4>
                    <h4 class="cover-content">{{ article.coverContent }}</h4>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
.container-area {
    width: 800px;
    margin: 0 auto;
    background-color: white;
    text-align: center;
}

.img-block {
    width: 325px;
    height: 230px;
    overflow: hidden;
    border-radius: 2%;
}

.article-container {
    display: flex;
    text-align: center;
    margin: 2px;
}

.cover-author {
    color: #be369b;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 6px;
}
.cover-title{
    color: #1c1918;
    font-size: 18px;
    font-weight: bold;
    line-height: 28px;
    text-transform: capitalize;
}
.cover-content {
    margin: 10px 0 20px 0;
    font-size: 15px;
    color: #777;
    line-height: 26px;
}
</style>
<script>
import originContent from '../assets/content.txt'
export default {
    name: 'App',
    data() {
        return {
            paperId: process.env.VUE_APP_PAPER_ID,
            articles: [],
        }
    },
    mounted() {
        this.parseOriginContent();
    },

    methods: {
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

                    let coverContent =[];
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
                        const imageMatch = line.match(/圖片：\s*(\d+-\d+\.jpg)(?:\s*\((.*?)\))?/);
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
                }
            });
        },
    }
}
</script>
  

