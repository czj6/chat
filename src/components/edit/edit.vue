<template>
  <el-container>
  <el-header class="edit-header">
    <h3>Creat group</h3>
    <el-input
        placeholder="请输入内容"
        v-model="searchRoom"
        @keyup.enter.native = "search"
       >
       <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
  </el-header>
  <el-main>
    <div class="edit-wrap">
      <h5>Photo</h5>
      <el-upload
              class="avatar-uploader"
              :action="'/apiv1/room/avatar/'+this.roomname"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <h5>Name</h5>
      <el-input
        :placeholder="this.roomname"
        clearable
        :disabled="inputFlag"
        v-model="roomname">
      </el-input>
      <h5>Topic</h5>
      <el-input
        placeholder="请输入内容"
        clearable
        :disabled="inputFlag"
         v-model="topic">
      </el-input>
      <h5>Description</h5>
      <el-input
        placeholder="请输入内容"
        clearable
        :disabled="inputFlag"
         v-model="roomdetail">
      </el-input>
    </div>
  </el-main>
  <el-footer>
      <el-button type="primary" @click="creatRoom">Creat group</el-button>
  </el-footer>
</el-container>
</template>
<script>
export default {
  data(){
    return {
      imageUrl: '',
      roomowner:'',
      roomname:'',
      roomdetail:'',
      topic:'',
      searchRoom:'',
      inputFlag : false
    }
  },
  methods:{
    creatRoom(){
      if(this.roomname == ''){
        this.alert('error','房间的名字不能为空')
      }
      else{
        let test = {
          roomowner: this.$store.getters.getName,
          roomname: this.roomname,
          roomdetail:this.roomdetail
        }
        this.$http.post("/apiv1/user/roomcreate",
              JSON.stringify(test)
            , {
                emulateJSON: true
            }).then(result => {
                console.log(result.body)
            })
        this.alert('success','房间创建成功')
        this.inputFlag = true
      }
    },
    alert(state,str){
      this.$message({
        showClose : true,
        message : str,
        type : state
      });
    },
    search(){
      var msg = {
        roomname: this.searchRoom
      }
      // this.$socket.emit('join',JSON.stringify(msg))
      this.$http.post("/apiv1/room/query",
              JSON.stringify(msg)
            , {
                emulateJSON: true
            }).then(result => {
              console.log(result.body)
                console.log(result)
                if(result.body.status===1003){
                    this.alert('error','查不到此房间')
                }else {
                   var test = {
                    username: this.$store.getters.getName,
                    roomname : result.body.roomname
                  }
                  var roomname = this.searchRoom
                  this.$store.commit("modifyRoomName",roomname)
                  this.$socket.emit('join',JSON.stringify(test))
                  this.$router.push({name:'roomname',params:{roomname}})
                }


            })
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$store.commit("modifyRoomImg",this.imageUrl)
      },
      beforeAvatarUpload(file) {
        if(this.roomname == ''){
          this.alert('error',"请先注册用户，成功后再上传图片")
          return;
        }
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
  },
  sockets: {
        connect: function() {
            console.log("ok")
        },
        message:function(data){
            console.log(data)
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
  mounted(){
    this.$socket.emit('connect',"ok")
  }
}
</script>
<style>
h5{
  padding: 0;
  margin: 13px 0;
}
.upload-demo,.el-upload,.el-upload-dragger{
    width: 100% !important;
  }
.el-upload-dragger{
  height: 150px;
}
.edit-header{
  height: 110px !important;
}
.edit-wrap{
  width: 65%;
  margin: 0 auto;
}
.el-button--primary{
  width: 30%;
}
.el-footer{
  text-align: center;
}
</style>
