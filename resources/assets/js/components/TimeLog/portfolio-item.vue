<template>

    <div class="col-lg-4 col-sm-6 portfolio-item">
        <div class="list-group-item card h-100">


            <a href="#"><img class="card-img-top" width="200px"
                             :src="addTd.visitor.photo ? '/images/' +  addTd.visitor.photo.file : 'http://placehold.it/700x400'" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                    <a href="#">{{addTd.visitor.name}}</a>
                    <el-button :loading="loading" type="primary"
                               @click="finishRow(addTd)">
                        <i class='glyphicon glyphicon-check'></i>
                        Finish

                    </el-button>
                    <h4 class="list-group-item-text ">
                        <i class='glyphicon glyphicon-time'></i>
                        <timeago
                                :auto-update="addTd.autoUpdate ?  addTd.autoUpdate  : autoUpdate"
                                :max-time="86400 * 365"
                                :locale="currentLang"
                                class="timeago"
                                :since="addTd.LocaleStartTime | parseInt">

                        </timeago>
                    </h4>
                </h4>
                <p class="card-text">School ID: {{addTd.visitor.schoolId}}</p>

                <h4 class="card-text">{{addTd.visitor.year | year_suffix}}</h4>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body {
        padding-top: 54px;
    }

    @media (min-width: 992px) {
        body {
            padding-top: 56px;
        }
    }

    .portfolio-item {
        margin-bottom: 30px;
    }
</style>
<script>

    var d = new Date();
    const now = d.getTime()
    var TIME = d.toLocaleTimeString();

    export default {
        props: ['addTd','currentLang', 'autoUpdate','loading', 'finishRow'],
        data() {

            return {
            };
        },
        filters: {
            year_suffix(str){
                var suffix
                if (str == 1) {
                    suffix = 'st'
                } else if (str == 2) {
                    suffix = 'nd'
                } else if (str == 3) {
                    suffix = 'rd'
                } else if (str == 4) {
                    suffix = 'th'
                }
                return `${str}${suffix} year`
            },
            parseInt(str){
                return parseInt(str)
            }
        },
        methods:{
        }
    }
</script>
