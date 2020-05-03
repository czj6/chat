<template>
  <el-container>
      <el-container>
    <el-header style="font-size: 12px">
      <span class="group_introduction_container">
         <el-avatar size="medium" :src="roomImg"></el-avatar>
        <p class="group_introduction">
          {{roomMsg.roomname}}
          <span></span>
        </p>
        <p>在线人数：{{personnum}}</p>
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
        v-show="search_flag"
        v-model="searchRoom"
        @keyup.enter.native = "search"
       >
       <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <div class="container chat" v-scroll>
        <div :class="[item.username==username?'right':'left']" v-for="item in chatText" :key="item.id">
            <el-avatar :src="item.useravatar"></el-avatar>
          <div class="item">{{item.message}}</div>
        </div>
    </div>
    </el-main>
    <el-footer>
      <el-input autosize placeholder="请输入内容" v-model.trim="textarea" @keyup.enter.native = "sendMsg">
      </el-input>
      <el-button icon="el-icon-s-promotion" circle @click="sendMsg"></el-button>
    </el-footer>
  </el-container>
  <el-container class="group_info" v-show="flag">
    <el-header>
      <i class="fa fa-angle-left fa-2x" aria-hidden="true" @click="flag=!flag"></i>
    </el-header>
    <el-main class="header_box">
        <el-avatar size="large" :src="roomImg"></el-avatar>
        <span>
          群昵称:
          <el-input v-model="roomMsg.roomname" :disabled="!(roomMsg.roomowner==username)"></el-input><br>
        </span>

    </el-main>
    <el-footer>
      <el-card shadow="always" class="msgItem">
        群介绍:
        <el-input v-model="roomMsg.roomdetail" :value="this.roomMsg.roomdetail" :disabled="!(roomMsg.roomowner==username)"></el-input>
      </el-card>
      <el-card shadow="always" class="msgItem">
        <!-- 这个是copy to share  -->
        <textarea id="bar" style="border:0;border-radius:5px;background-color:rgba(241,241,241,.98);width: 80%;height: 70px;padding: 10px;resize: none;" v-model="roomMsg.roomurl"></textarea>
        <el-button type="primary" icon="el-icon-copy-document" class="btn" data-clipboard-target="#bar">copy to share</el-button>
      </el-card>
      <el-button type="primary" size="medium"  :disabled="!(roomMsg.roomowner==username)" @click="modifyRoom">Modify</el-button>
      <el-button type="danger" size="medium"  @click="open1" v-show="!(roomMsg.roomowner==username)">exit</el-button>
      <el-button type="danger" size="medium"   v-show="roomMsg.roomowner==username" @click="open2">解散群聊</el-button>
    </el-footer>
  </el-container>
  <el-dialog title="用户信息" :visible.sync="dialogFlag">
  <el-form>
    <el-form-item label="昵称">
      <el-input  autocomplete="off" v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input  autocomplete="off" v-model="email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input  autocomplete="off" v-model="phone"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="confirmDialog">确 定</el-button>
  </div>
</el-dialog>
  </el-container>

</template>
<script>
import Clipboard from 'clipboard';
export default {

    data(){
      return {
          flag:false,
          textarea:'',
          search_flag:false,
          roomname: this.$route.params.roomname,
          chatText:'',
          username:this.$store.getters.getName,
          roomMsg: '',
          userImg:this.$store.getters.getImgUrl,
          roomImg:'',
          searchRoom:'',
          personnum: this.$store.getters.getPersonNum,
          dialogFlag:'',
          email:this.$store.getters.getEmail,
          phone:this.$store.getters.getPhone
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
      alert(state,str){
        this.$message({
          showClose : true,
          message : str,
          type : state
        });
      },
      getChatText(){
        this.$http.get('/apiv1/room/message/'+this.roomname).then(result => {
          var data = result.body.data
          // data.forEach(item => {
          //   this.temp = this.getUserImg(item.username)
          //   item.img = this.temp
          //   console.log(item)
          // });
          this.personnum = data.onlineusers
          this.chatText = data.msg
        })
        console.log(this.chatText)
      },
      sendMsg(){
        if(this.textarea === ''){
          this.alert("warning","发送的内容不能为空")
          return;
        }
        var message = {
          username:this.username,
          roomname:this.roomname,
          message:this.textarea,
        }
        this.$socket.emit('new message',JSON.stringify(message))
        message.useravatar = this.$store.getters.getImgUrl
        this.textarea = ''
        this.chatText.push(message)
      },
      queryRoomMsg(){
        let test = {
        roomname: this.roomname
        }
       this.$http.post("/apiv1/room/query",
              JSON.stringify(test)
            , {
                emulateJSON: true
            }).then(result => {
                this.roomMsg = result.body
            })
      },
      getRoomImg(){
         this.$http.get('/apiv1/room/avatar/download/'+this.roomname,{responseType: 'blob'}).then(result => {
           return result.blob()
        }).then(blob => {
          let url = URL.createObjectURL(blob)
          this.roomImg = url
        })
      },
      getUserImg(user){

        this.$http.get('/apiv1/user/avatar/download/'+user,{responseType: 'blob'}).then(result => {
           return result.blob()
        }).then(blob => {
          var url = URL.createObjectURL(blob)
          // console.log(this.temp)
        })
      },
      modifyRoom(){
        let test = {
          roomname:this.roomMsg.roomname,
          roomdetail:this.roomMsg.roomdetail
        }
        this.$http.post("/apiv1/room/query",
              JSON.stringify(test)
            , {
                emulateJSON: true
            }).then(result => {
                 this.$store.commit("modifyRoomName",test.roomname)
                this.queryRoomMsg()
            })
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
                    this.alert("error","房间不存在")
                    return;
                  }
                  if(this.$store.getters.getName ==''){
                    this.alert("warning","请先注册昵称")
                  }
                  var test = {
                    username: this.$store.getters.getName,
                    roomname : result.body.roomname
                  }
                  var roomname = this.searchRoom
                  this.searchRoom = ''
                  this.$socket.emit('join',JSON.stringify(test))
                  this.$store.commit("modifyRoomName",test.roomname)
                  this.$router.push({name:'roomname',params:{roomname}})

          })
      },
      leave(){
        let test = {
          username:this.username,
          roomname:this.roomname
        }
        this.$socket.emit('leave',JSON.stringify(test))
        console.log('leave')
        this.$store.commit("modifyRoomName",'')
        this.$router.push({name:'ChatDefault',path:'/chat'})
      },
      close(){
        let test = {
          roomowner:this.username,
          roomname:this.roomname
        }
        this.$socket.emit('close',JSON.stringify(test))
        this.$store.commit("modifyRoomName",'')
        this.$router.push({name:'ChatDefault',path:'/chat'})
      },
      open1() {
        this.$confirm('确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '溜了溜了!'
          });
          this.leave()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '还不想走'
          });
        });
      },
      open2(){
        this.$confirm('确定解散群聊?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解散了!'
          });
          this.close()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '还不想解散'
          });
        });
      },
      dialogIsOpen(){
        if(this.username == ''){
          this.dialogFlag = true
        }else{
          this.dialogFlag = false
        }
      },
      confirmDialog(){
        if(this.username == ''){
          this.alert("error","用户名不能为空")
          this.dialogFlag = true
        }
        else{
          let test = {
            username: this.username,
            phone: this.phone,
            email:this.email
          }
          this.$store.commit("modify",this.username)
          this.$store.commit("modifyPhone",this.phone)
          this.$store.commit("modifyEmail",this.email)
          let url = '/apiv1/user/register'
          this.$http.post(url,
                JSON.stringify(test)
              , {
                  emulateJSON: true
              }).then(result => {
                  console.log(result.body)
                  console.log(this.$store.getters.getName)
              })
          this.alert("success","注册成功")
          var msg = {
                    username: this.$store.getters.getName,
                    roomname : this.$route.params.roomname
                  }
          this.$socket.emit('join',JSON.stringify(msg))
          this.$store.commit("modifyRoomName",this.$route.params.roomname)
          this.dialogFlag = false
        }
      },
      cancelDialog(){
          this.alert("error","熊孩子，还不快注册！")
          this.dialogFlag = true
      }
    },
    beforeRouteUpdate(to, from, next){
      this.roomname = to.params.roomname
      this.getChatText()
      this.queryRoomMsg()
      this.getRoomImg()
      next()
    },
    beforeMount(){
      this.dialogIsOpen()
      this.getChatText(),
      this.getRoomImg()
    },
    mounted() {
      const clipboard = new Clipboard('.btn');
      this.$socket.emit('connect',"ok")
      this.queryRoomMsg()
    },
    sockets:{
       message:function(msg){
         console.log(msg)
          var msg = JSON.parse(msg)
          var action = msg.data.action
          if(action == 'in' || action == 'out'){
            this.$store.commit("modifyPersonNum",msg.data.onlineusers)
            this.personnum = msg.data.onlineusers
            return;
          }
          if(action == 'close'){
            console.log('群主解散了')
            this.leave()
            return;
          }
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
  width: 41%;
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
  width: 40%;
}
.header_box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.group_info .el-header{
  background-color: #fff;
  align-items: center;
}
.group_info .el-main{
  flex: 0.3;
}
.group_info .el-footer{
  flex: 1;
}
.el-input{
  width: 88%;
}
.msgItem{
  margin: 30px 0;
}
/* 聊天框 */
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
    font-size: 12px;
    margin: 20px 0;

}

.left {
    flex-basis: 100%;
    margin: 20px 0;
}

.item{
    display: inline-block;
    max-width: 20%;
    word-wrap: break-word;
    word-break: break-all;
    background-color: yellow;
    border-radius: 5px;
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
