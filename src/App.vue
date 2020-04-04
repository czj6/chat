<template>
  <!-- <el-container>
    <el-aside>这是侧边导航</el-aside>
    <el-container>这是容器</el-container>

  </el-container> -->

  <el-container style=" border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <i class="fa fa-qq fa-2x icon1" aria-hidden="true"></i>
      <router-link to="/home"><i class="fa fa-comment-o fa-2x icon2" aria-hidden="true"></i></router-link>
      <router-link to="/user"><i class="fa fa-user fa-2x icon3" aria-hidden="true"></i></router-link>
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

      }
    },
    methods:{

    }
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
  top: 40%;
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
  .el-aside {
    color: #333;
  }
</style>
