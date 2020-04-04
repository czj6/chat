<template>
  <el-container>
    <el-aside width="35%" style="background-color: rgb(238, 241, 246)">
      <h3>Profile</h3>
       <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
       >
       </el-input>
       <el-card class="box-card">
        <div>
          这是卡片1
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          这是卡片2
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
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </div>
          <h5>Avatar</h5>
          <div class="text item">
            <el-input placeholder="请输入内容"></el-input>
          </div>
          <h5>Avatar</h5>
          <div class="text item">
            <el-input placeholder="请输入内容"></el-input>

          </div>
          <h5>Avatar</h5>
          <div class="text item">
            <el-input placeholder="请输入内容"></el-input>

          </div>
        </el-card>
       </el-main>
     </el-container>
  </el-aside>

  </el-container>
</template>
<script>
export default {
  data(){
    return {}
  },
  methods:{

  }
}
</script>
<style scoped>
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
</style>
