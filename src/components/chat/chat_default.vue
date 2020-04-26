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
        <i class="fa fa-chevron-circle-down fa-1x" aria-hidden="true"></i>
      </span>
    </el-header>

    <el-main>
      <el-input
        placeholder="请输入内容"
        v-show="search_flag"
        v-model="searchRoom"
       >
       <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-container v-loading="true"
          element-loading-text="来不及解释了，快进入房间"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="container chat" v-scroll>
        <div class="right">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="item">1</div>
        </div>
        <div class="left">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="item">3333333333333333333333333333333333333333333333333333333333333332</div>
        </div>
        <div class="right">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="item">3</div>
        </div>
        <div class="left">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="item">4</div>
        </div>
    </div>
      </el-container>

    </el-main>
    <el-footer>
      <el-input  autosize placeholder="请输入内容" :disabled="true" :resize="none">
      </el-input>
      <el-button icon="el-icon-s-promotion" circle disabled></el-button>
    </el-footer>
  </el-container>
  </el-container>

</template>
<script>
export default {
    data(){
      return {
          flag:false,
          search_flag:false,
          searchRoom:''
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
      search(){
        var msg = {
          roomname: this.searchRoom
        }
        this.$http.post("/apiv1/room/query",
                JSON.stringify(msg)
              , {
                  emulateJSON: true
              }).then(result => {
                console.log(result.body)
                  console.log(result)
                  if(result.body.status===1003){
                    this.alert("房间不存在")
                    return;
                  }
                  if(this.$store.getters.getName ==''){
                    this.alert("请先注册昵称")
                  }
                  var test = {
                    username: this.$store.getters.getName,
                    roomname : result.body.roomname
                  }
                  var roomname = this.searchRoom
                  this.$socket.emit('join',JSON.stringify(test))
                  this.$router.push({name:'roomname',params:{roomname}})

          })
      },
      alert(str){
      this.$message.error(str);
    },
    },
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
.el-input{
  width: 90%;
}
.container {
    width: 100%;
    height: 520px;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: scroll;
}

.right {
    flex-basis: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.left {
    flex-basis: 100%;
}
.item{
    display: inline-block;
    max-width: 20%;
    word-wrap: break-word;
    word-break: break-all;
    background-color: yellow;
}
</style>
