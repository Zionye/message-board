<template>
  <NuxtLayout>
    <template #default>
      <div class="relative mx-3 pt-8">
        <div class="flex items-center border-2 border-indigo-600 rounded-md w-full">
          <input type="text" class="inp pl-3" placeholder="搜索" v-model="searchItem">
            <Icon v-if="isSearching" name="eos-icons:loading" size="25" class="mr-2"/>
            <button class="flex items-center h-[100%] p-1.5 px-2 bg-indigo-600">
              <Icon name="ph:magnifying-glass" size="20" color="#ffffff"/>
            </button>
        </div>

        <div class="box-border bg-white rounded shadow-[0_3px_10px_3px_rgba(0,0,0,0.15)]">
          <ul class="mt-4 pl-4">
            <li v-for="item in items" :key="item.id" class="py-2 border-b">
            <!-- <li v-for="item in Message.megList" :key="item.id" class="py-2 border-b"> -->
              <h4 class="text-lg font-semibold">{{ item.title }}</h4>
              <p class="truncate text-gray-600">{{ item.timer }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</p>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <div>
        <NuxtLink to="/" replace class="msg-a">
          <span class="text-gray-500">去留言</span><Icon name="bi:chevron-double-right" size="13" class="text-gray-500"></Icon>
        </NuxtLink>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import {useStore} from '../stores/msg'
// import {useMessageStore} from '../stores/message'
const Msg = useStore()
// const Message = useMessageStore()

let isSearching = ref(false)
let searchItem = ref('')
let items = ref(null)

const getData = async () => {
  // // let {data} = await useFetch(`/api/message`)
  // // Message.megList = data._rawValue || []
  // Message.getMessageData()

  items.value = Msg.megList || []
}
getData()

const searchByName = async () => {
  isSearching.value = true

  setTimeout(() => {
    const megList = toRaw(Msg.megList)
    const searchData = megList.filter(item => item.title.includes(searchItem.value) || item.content.includes(searchItem.value))
    items = toRef(searchData)

    isSearching.value = false
    return
  }, 200)
}

watch(() => searchItem.value, async () => {
  if(!searchItem.value){
    setTimeout(() => {
      items.value = Msg.megList
      isSearching.value = false
      return
    }, 500)
  }

  searchByName() 
})
</script>