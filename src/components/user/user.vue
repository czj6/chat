<template>
  <el-container>
    <el-aside width="35%" style="background-color: rgb(238, 241, 246)">
      <h3>Profile</h3>
       <el-input
        placeholder="请输入内容"
       >
       <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
       </el-input>
       <el-card class="box-card">
        <div>
           <div class="block"><el-avatar :size="50" :src="imageUrl"></el-avatar></div>
           <p>{{this.$store.getters.getName}}</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="detailBox">
          <div>
            <p>Phone</p>
            <p>{{this.$store.getters.getPhone}}</p>
          </div>
          <div>
            <i class="el-icon-phone-outline"></i>
          </div>
        </div>
        <div class="detailBox">
          <div>
            <p>Email</p>
            <p>{{this.$store.getters.getPhone}}</p>
          </div>
          <div>
            <i class="el-icon-message"></i>
          </div>
        </div>
        <div class="detailBox">
          <div>
            <p>Time</p>
            <p>{{time | dateFormat}}</p>
          </div>
          <div>
            <i class="el-icon-timer"></i>
          </div>
        </div>
      </el-card>
  </el-aside>
   <el-aside width="65%" style="background-color: rgb(238, 241, 246)">
     <el-container>
       <el-header>
        <h3>Settings</h3>
       </el-header>
       <el-main>
         <el-card class="box-card-account">
          <div slot="header" class="clearfix">
            <span>Account</span>
            <i class="el-icon-user" style="float: right"></i>
         </div>
          <h5>Avatar</h5>
          <div class="text item">
            <!-- <el-upload
              class="upload-demo"
              drag
              :action="'/apiv1/user/avatar/'+this.username"
              name="file"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload> -->
           <el-upload
              class="avatar-uploader"
              :action="'/apiv1/user/avatar/'+this.username"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <h5>Name</h5>
          <div class="text item">
            <el-input placeholder="请输入内容" v-model.trim="username"></el-input>
          </div>
          <h5>Phone</h5>
          <div class="text item">
            <el-input placeholder="请输入内容" v-model.trim="phone"></el-input>

          </div>
          <h5>Email</h5>
          <div class="text item">
            <el-input placeholder="请输入内容" v-model.trim="email"></el-input>
          </div>
          <el-button type="primary" round size="medium" @click="savaData" v-show="!btnFlag">Register</el-button>
          <el-button type="success" round size="medium" @click="savaData" v-show="btnFlag">Modify</el-button>
        </el-card>
       </el-main>
     </el-container>
  </el-aside>

  </el-container>
</template>
<script>
export default {
  data(){
    return {
      username:'',
      phone:'',
      email:'',
      imageUrl: '',
      btnFlag:false,
      searchRoom:'',
      time: ''
    }
  },
  mounted(){
      this.getTime()
  },
  methods:{
    savaData(){
      if(this.username == ''){
        this.alert("error","用户名不能为空")
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
        let url = ''
        if(this.btnFlag == true){
            url = "/apiv1/user/modify"
        }
        else{
            url = "/apiv1/user/register"
        }
        this.$http.post(url,
              JSON.stringify(test)
            , {
                emulateJSON: true
            }).then(result => {
                console.log(result.body)
                console.log(this.$store.getters.getName)
            })
        this.btnFlag = true
        if(this.btnFlag == true){
          this.alert("success","修改成功")
        }
        else
        this.alert("success","注册成功")
      }
    },
    alert(state,str){
      this.$message({
        showClose : true,
        message : str,
        type : state
      });
    },
    getTime(){
      setInterval( () =>{
        this.time = Date.now()
      }
      ,1000)
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$store.commit("modifyImg",this.imageUrl)
      },
      beforeAvatarUpload(file) {
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
      }
  }
}
</script>
<style>
h5{
  margin: 0;
  padding: 0;
  margin: 6px 0;
}
 .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card-account{
    width: 50%;
    margin: 0 auto;
  }
  .box-card-account .item,.upload-demo,.el-upload__text,.upload-demo div{
    width: 100% !important;
  }
.el-button--medium{
  width: 100%;
  margin: 10px 0;
}
.avatar-uploader{
  width: 100%;
}
.avatar-uploader .el-upload {
  width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    height: 178px;
  }
  .block{
    text-align: center;
  }
  .box-card p{
    text-align: center;
    font-weight: bold;
  }
  .detailBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
  }
  .detailBox p {
    margin: 0;
    font-weight: normal;
    text-align: left;
  }
  .detailBox p:nth-child(1){
    font-size: 12px;
  }
</style>
