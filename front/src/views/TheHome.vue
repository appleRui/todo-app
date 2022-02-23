<style lang="scss" scopped>
// .the-home{
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
</style>
<template>
  <div class="the-home">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">名前</th>
            <th class="text-left">メールアドレス</th>
            <th class="text-left">登録日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ dateFormat(user.created_at) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TheHome",
  data() {
    return {
      users: null
    }
  },
  created() {
    axios.get('http://localhost:3000/api/v1/users').then((res)=>{
      this.users = res.data
    })
  },
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  }

}
</script>
