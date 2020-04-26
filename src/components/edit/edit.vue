<template>
  <el-container>
  <el-header class="edit-header">
    <h3>Creat group</h3>
    <el-input
        placeholder="请输入内容"
        v-model="searchRoom"
       >
       <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
  </el-header>
  <el-main>
    <div class="edit-wrap">
      <h5>Photo</h5>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <h5>Name</h5>
      <el-input
        :placeholder="this.roomname"
        clearable
        v-model="roomname">
      </el-input>
      <h5>Topic</h5>
      <el-input
        placeholder="请输入内容"
        clearable
         v-model="topic">
      </el-input>
      <h5>Description</h5>
      <el-input
        placeholder="请输入内容"
        clearable
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
    }
  },
  methods:{
    creatRoom(){
      if(this.roomname == ''){
        this.alert()
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
      }
    },
    alert(){
      this.$message.error('名称不能为空');
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
                  console.log('erro')
                }else {
                   var test = {
                    username: this.$store.getters.getName,
                    roomname : result.body.roomname
                  }
                  var roomname = this.searchRoom
                  this.$socket.emit('join',JSON.stringify(test))
                  this.$router.push({name:'roomname',params:{roomname}})
                }


            })
    }
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
