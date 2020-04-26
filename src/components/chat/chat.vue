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
      <div class="container chat" v-scroll>
        <div :class="[item.username==username?'right':'left']" v-for="item in chatText" :key="item.id">
           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="item">{{item.message}}</div>
        </div>
    </div>
    </el-main>
    <el-footer>
      <el-input autosize placeholder="请输入内容" v-model.trim="textarea">
      </el-input>
      <el-button icon="el-icon-s-promotion" circle @click="sendMsg"></el-button>
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
          search_flag:false,
          roomname: this.$route.params.roomname,
          chatText:'',
          username:this.$store.getters.getName
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
      alert(str){
      this.$message.error(str);
      },
      getChatText(){
        this.$http.get('/apiv1/room/message/'+this.roomname).then(result => {
          this.chatText = result.body.data
        })
      },
      sendMsg(){
        if(this.textarea === ''){
          this.alert("发送的内容不能为空")
          return;
        }
        var message = {
          username:this.username,
          roomname:this.roomname,
          message:this.textarea
        }
        this.chatText.push(message)
        this.$socket.emit('new message',JSON.stringify(message))
      }
    },
    beforeMount(){
      this.getChatText()
    },
    mounted() {
      this.$socket.emit('connect',"ok")
    },
    sockets:{
       message:function(msg){
         console.log(msg)
          var msg = JSON.parse(msg)
          this.chatText.push(msg.data)
      }
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

/*设置滚动条样式*/

.chat::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}

.chat::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    background: rgba(0, 0, 0, 0.2);
}

.chat::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
</style>
