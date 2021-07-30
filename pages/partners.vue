<template>
    <div class="page-inner">
        <div class="container">
            <LayoutBreadcrumbs
                :crumbs="breadcrumbs"
            />
            <h2>Партнеры</h2>
            <div class="icons">
                <div class="img">
                    <img src="@/assets/img/image 1.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 10.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 11.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 12.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 13.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 14.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 16.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 18.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 19.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 20.svg" alt="">
                </div>
                <div class="img">
                    <img src="@/assets/img/image 21.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'partners',
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Главная',
                    url: '/',
                },
                {
                    title: 'Контакты',
                    url: '/questions'
                }
            ],
        }
    }
}
</script>

<style scoped>

    h2{
        font-size: 28px;
        color: #3F414E;
        font-weight: 700;
        margin: 30px 0;
    }
    .icons{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 100px;
    }
    .icons div{
        padding: 20px;
        width: 28%;
        margin-left: 15px;
        border: 1px solid lightgray;
        margin-top: 15px;
    }
    .icons div img{
        height: 60px;
        width: 174px;
    }
</style>