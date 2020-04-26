<template>
  <!-- <el-container>
    <el-aside>这是侧边导航</el-aside>
    <el-container>这是容器</el-container>

  </el-container> -->

  <el-container style=" border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <i class="fa fa-qq fa-2x icon1" aria-hidden="true"></i>
      <router-link to="/edit" class="edit" tag="span"><i class="el-icon-edit-outline icon5" ></i></router-link>
      <router-link to="/home" tag="span"><i class="fa fa-comment-o fa-2x icon2" aria-hidden="true"></i></router-link>
      <router-link to="/user" tag="span"><i class="fa fa-user fa-2x icon3" aria-hidden="true"></i></router-link>
      <i class="fa fa-cog fa-2x icon4" aria-hidden="true"></i>
  </el-aside>
  <transition>
    <router-view></router-view>
  </transition>


</el-container>

</template>
<script>
import "../static/font-awesome/css/font-awesome.min.css"
export default {
   data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        test:{
                username: '张三',
                userdetail: '没有',
                phone: '999999'
            }
      }
    },
    methods:{
        //  postInfo() {
        //     this.$http.post("/apiv1/user/register",
        //       JSON.stringify(this.test)
        //     , {
        //         emulateJSON: true
        //     }).then(result => {
        //         console.log(result.body)
        //     })
        // }
    },

}
</script>
<style scoped>
.el-container{
  height: 682px;
}
.el-aside{
  position: relative;
}
.el-aside .icon1{
  position: absolute;
  left: 39%;
  top: 5%;
}
.el-aside .icon2{
  position: absolute;
  top: 42%;
  left: 39%;
}
.el-aside .icon3{
  position: absolute;
  top: 55%;
  left: 39%;
}
.el-aside .icon4{
  position: absolute;
  top: 90%;
  left: 39%;
}
.el-aside .edit{
  font-size: 32px;
}
.el-aside .icon5{
  position: absolute;
  top: 30%;
  left: 39%;
  width: 32px;
  height: 32px;
}
  .el-aside {
    color: #333;
  }
</style>
