<template>
  <div style="width: 100%;height: 100%;position: relative">
    <div class="body-content">
      <div class="task-bar">
        <input class="search" type="text" placeholder="请输入要搜索的书名" value="" v-model="searchtext"
               @input="valChange($event)">
        <button class="new-build" @click="addTr('add')">添加</button>
      </div>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>书名</th>
          <th>作者</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in bookList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.bookName }}</td>
          <td>{{ item.bookAuthor }}</td>
          <td>
            <button class="edit" @click="edit(item.id,'edit')">修改</button>
            <button class="delete" @click="deleteTr(item.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="shade" v-if="flag">
      <div class="add-content">
        <div class="tk-title" v-if="type === 'add'">添加</div>
        <div class="tk-title" v-else>修改</div>
        <div class="edit-content">
          <div>
            <div class="type-name">id:</div>
            <input class="type-input" type="text" v-model="id" :disabled="disflag">
          </div>
          <div>
            <div class="type-name">书名:</div>
            <input class="type-input" type="text" v-model="bookName">
          </div>
          <div>
            <div class="type-name">作者名称:</div>
            <input class="type-input" type="text" v-model="bookAuthor">
          </div>
        </div>
        <div class="add-btn">
          <button class="cancel-btn" @click="cancel()">取消</button>
          <button class="confirm-btn" @click="confirm()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "operation",
  data() {
    return {
      bookList: [
        {
          id: 1,
          bookName: '老人与海',
          bookAuthor: '海明威'
        },
        {
          id: 2,
          bookName: '三国演义',
          bookAuthor: '罗贯中'
        },
        {
          id: 3,
          bookName: '水浒传',
          bookAuthor: '施耐庵'
        },
        {
          id: 4,
          bookName: '西游记',
          bookAuthor: '吴承恩'
        },
        {
          id: 5,
          bookName: '红楼梦',
          bookAuthor: '曹雪芹'
        },
        {
          id: 6,
          bookName: '呐喊',
          bookAuthor: '鲁迅'
        },
      ],
      bookList2: [],
      flag: false,
      id: '',
      bookName: '',
      bookAuthor: '',
      disflag: false,
      type: '',
      index: 0,
      searchtext: ''
    }
  },
  methods: {
    //添加行
    addTr(type) {
      this.type = type;
      this.flag = true;
    },
    //修改行
    edit(id, type) {
      this.type = type;
      this.bookList.some((item, index) => {
        if (item.id === id) {
          this.index = index;
          this.id = item.id;
          this.bookName = item.bookName;
          this.bookAuthor = item.bookAuthor;
          this.disflag = true;
          this.flag = true;
          return true;
        }
      })
    },
    //删除行
    deleteTr(id) {
      this.bookList = this.bookList.filter(function (item) {
        return item.id !== id;
      });
      this.bookList2 = this.deepCopy(this.bookList);
    },
    //添加弹框-确认
    confirm() {
      if (this.type === 'edit') {
        this.bookList[this.index].bookName = this.bookName;
        this.bookList[this.index].bookAuthor = this.bookAuthor;
      } else {
        let type = this.bookList.some((item) => {
          if(item.id === Number(this.id)) {
            return true;
          }
        })
        if (type) {
          alert('id不能重复请重新输入！')
          return false;
        }
        this.bookList.push(
          {
            id: this.id,
            bookName: this.bookName,
            bookAuthor: this.bookAuthor,
          }
        )
      }
      this.bookList2 = this.deepCopy(this.bookList);
      this.disflag = false;
      this.flag = false;
      this.id = '';
      this.bookName = '';
      this.bookAuthor = '';
    },
    //添加弹框-取消
    cancel() {
      this.disflag = false;
      this.flag = false;
      this.id = '';
      this.bookName = '';
      this.bookAuthor = '';
    },
    //获取input中的内容
    valChange() {
      if (this.searchtext === "") {
        this.bookList = this.deepCopy(this.bookList2);
      }
      this.bookList = this.bookList.filter((item) => {
        return item.bookName.indexOf(this.searchtext) !== -1 || item.bookAuthor.indexOf(this.searchtext) !== -1;
      });
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  },
  created() {
    this.bookList2 = this.deepCopy(this.bookList);
    console.log("test");
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.body-content {
  width: 50%;
  margin: 3% auto 0;
}

.task-bar {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search {
  width: 25%;
  height: 65%;
  border: 1px solid #c1c2c6;
  border-radius: 5px;
  padding-left: 10px;
}

.search:focus {
  outline: none;
  border: 1px solid #5591c6;
}

.new-build {
  width: 10%;
  height: 70%;
  color: #FFFFFF;
  background: #33bc65;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
}

table {
  width: 100%;
  border: 1px solid #eaeaea;
  border-collapse: collapse;
  box-sizing: border-box;
}

thead {
  height: 35px;
  background: #176ad1;
}

thead tr th {
  color: #FFFFFF;
}

tbody tr {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #eaeaea;
}

tr:last-of-type {
  border-bottom: 0;
}

tr > td:nth-of-type(1), tr > th:nth-of-type(1) {
  width: 10%;
  height: inherit;
}

tr > td:nth-of-type(2), tr > th:nth-of-type(2) {
  width: 35%;
  height: inherit;
}

tr > td:nth-of-type(3), tr > th:nth-of-type(3) {
  width: 35%;
  height: inherit;
}

tr > td:nth-of-type(4), tr > th:nth-of-type(4) {
  width: 20%;
  height: inherit;
}

button {
  border: 0;
  border-radius: 4px;
}

.edit {
  width: 45%;
  height: 80%;
  color: #FFFFFF;
  background: #2c95dc;
  cursor: pointer;
}

.delete {
  width: 45%;
  height: 80%;
  color: #FFFFFF;
  background: #d94646;
  cursor: pointer;
}

.shade {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
}

.add-content {
  width: 24%;
  height: 30%;
  z-index: 999;
  position: absolute;
  left: 38%;
  top: 25%;
  border: 1px solid #176ad1;
  border-radius: 10px;
  background: #FFFFFF;
}

.tk-title {
  width: 100%;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #c1c2c6;
}

.edit-content {
  width: 100%;
  height: 70%;
  padding-top: 11%;
  box-sizing: border-box;
}

.edit-content > div {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-name {
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.type-input {
  width: 40%;
  height: 60%;
  border: 1px solid #c1c2c6;
  border-radius: 5px;
  margin-left: 10px;
  padding-left: 10px;
}

.type-input:focus {
  outline: none;
  border: 1px solid #5591c6;
}

.add-btn {
  width: 100%;
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-btn {
  width: 20%;
  height: 57%;
  color: #333333;
  background: #FFFFFF;
  cursor: pointer;
  border: 1px solid #2c95dc;
  box-sizing: border-box;
}

.confirm-btn {
  width: 20%;
  height: 57%;
  color: #FFFFFF;
  background: #2c95dc;
  cursor: pointer;
  margin-left: 30px;
}
</style>
