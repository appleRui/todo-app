<style lang="scss" scoped></style>

<template>
  <div class="todos">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: []
    }
  },
  async created() {
    const res = await axios.get('http://localhost:3000/api/v1/todos/index')
    if(res.data){
      this.items = res.data
    }
  },
}
</script>