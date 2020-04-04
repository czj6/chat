<template>
  <el-container>
      <el-container>
    <el-header style="font-size: 12px">
      <span class="group_introduction_container">
        <i class="fa fa-superpowers fa-2x" aria-hidden="true"></i>
        <p class="group_introduction">
          <span>bootstrap</span>
          <span></span>
        </p>
      </span>
      <span class="header_icons">
        <i class="fa fa-search fa-1x" aria-hidden="true" @click="search_flag=!search_flag"></i>
        <i class="fa fa-share fa-1x" aria-hidden="true"></i>
        <!-- <i class="fa fa-chevron-circle-down fa-1x" aria-hidden="true"></i> -->
        <el-dropdown trigger="click"  @command="handleCommand">
        <i class="fa fa-chevron-circle-down fa-1x" aria-hidden="true"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="c">Mute   <i class="fa fa-sliders" aria-hidden="true"></i></el-dropdown-item>
          <el-dropdown-item>Delete   <i class="fa fa-trash-o" aria-hidden="true"></i></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>
    </el-header>

    <el-main>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-show="search_flag"
       >
      </el-input>
      <div class="container">
        <div class="item right">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div>1</div>
        </div>
        <div class="item left">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div>3333333333333333333333333333333333333333333333333333333333333332</div>
        </div>
        <div class="item right">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div>3</div>
        </div>
        <div class="item left">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div>4</div>
        </div>
    </div>
    </el-main>
    <el-footer>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea">
      </el-input>
      <el-button icon="el-icon-s-promotion" circle></el-button>
    </el-footer>
  </el-container>
  <el-container class="group_info" v-show="flag">
    <el-header>
      <i class="fa fa-angle-left fa-2x" aria-hidden="true" @click="flag=!flag"></i>
    </el-header>
    <el-main>
        <i class="fa fa-superpowers fa-2x" aria-hidden="true"></i>
        <h5>bootstrap</h5>
        <p>html,js,css and so on</p>
    </el-main>
    <el-footer>
      photo
      <el-card shadow="always">

      </el-card>
      name
      <el-card shadow="always">

      </el-card>
      topic
      <el-card shadow="always">

      </el-card>
    </el-footer>
  </el-container>
  </el-container>

</template>
<script>
export default {
    data(){
      return {
          flag:false,
          textarea:'',
          search_flag:false
      }
    },
    methods:{
      changeFlag(){
        this.flag=!this.flag;
      },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        this.flag = !this.flag
      },
    }
}
</script>
<style scoped>
.el-header {
  display: flex;
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    justify-content: space-between;
  }
.el-header .group_introduction{
  display: flex;
  flex-direction: column;
  padding: 4px;
}
.el-header .group_introduction_container{
  display: flex;
  justify-content: space-between;
  width: 15%;
  align-items: center;
}
.el-header .header_icons{
  display: flex;
  width: 15%;
  justify-content: space-around;
  align-items: center;
}


.group_info{
  /* background-color: pink; */
  width: 19%;

}
.group_info .el-header{
  background-color: #fff;
  align-items: center;
}
.group_info .el-main{
  flex: 0.7;
}
.group_info .el-footer{
  flex: 1;
}
.el-textarea{
  width: 70%;
}
.container {
    width: 100%;
    height: 400px;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start
}

.right {
    flex-basis: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.left {
    flex-basis: 100%;
}

.item div {
    display: inline-block;
    max-width: 20%;
    word-wrap: break-word;
    word-break: break-all;
    background-color: yellow;
}
</style>
