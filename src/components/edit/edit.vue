<template>
  <el-container>
  <el-header class="edit-header">
    <h3>Creat group</h3>
    <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
       >
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
        placeholder="请输入内容"
        clearable>
      </el-input>
      <h5>Topic</h5>
      <el-input
        placeholder="请输入内容"
        clearable>
      </el-input>
      <h5>Description</h5>
      <el-input
        placeholder="请输入内容"
        clearable>
      </el-input>
    </div>
  </el-main>
  <el-footer>
      <el-button type="primary">Creat group</el-button>
  </el-footer>
</el-container>
</template>
<script>
export default {
  data(){
    return {
      imageUrl: ''
    }
  },
  methods:{

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
