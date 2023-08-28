<template>
  <NuxtLayout>
    <template #default>
      <div class="pt-8">
        <div class="flex justify-center">
          <p class="relative text-blackfont-semibold text-lg after:block after:w-6 after:mx-auto after:pb-[2px] after:border-b-[3px] after:border-indigo-600">留言板</p> 
        </div>
        <div class="mx-3 my-6">
          <div>
            <div class="required-title">
              <Icon name="bi:asterisk" size="8" color="red"></Icon>
              <p class="pl-2">留言类型:</p>
            </div>
            <div class="required-cont">
              <button @click="selMType(1)" class="tbtn mr-3" :class="form.type === 1?'tbtn-in':''">投诉</button>
              <button @click="selMType(2)" class="tbtn mr-3" :class="form.type === 2?'tbtn-in':''">建议</button>
              <button @click="selMType(3)" class="tbtn mr-3" :class="form.type === 3?'tbtn-in':''">举报</button>
            </div>
          </div>
  
          <div class="border-b my-5" />

          <div>
            <div class="required-title">
              <Icon name="bi:asterisk" size="8" color="red"></Icon>
              <p class="pl-2">留言标题:</p>
            </div>
            <div class="required-cont">
              <input v-model="form.title" class="inp" placeholder="请输入标题" />
            </div>
          </div>

          <div class="border-b my-5" />

          <div>
            <div class="required-title">
              <Icon name="bi:asterisk" size="8" color="red"></Icon>
              <p class="pl-2">留言内容:</p>
            </div>
            <div class="required-cont">
              <textarea v-model="form.content" rows="4" class="inp" placeholder="请输入留言内容..." />
            </div>
          </div>
  
          <div class="border-b my-5" />
  
          <div>
            <div class="required-title">
              <Icon name="bi:asterisk" size="8" color="red"></Icon>
              <p class="pl-2">联系方式:</p>
            </div>
            <div class="required-cont">
              <input v-model="form.phone" class="inp" placeholder="请输入联系方式" />
            </div>
          </div>
  
          <div class="mt-20">
            <div class="flex justify-between">
              <button class="sum-btn border-indigo-600 text-indigo-600 mr-2">重置</button>
              <button class="sum-btn" :class="isButtonDisabled?'bg-gray-200 border-gray-200':'bg-indigo-600 border-indigo-600 text-white'" @click="submit">提交</button>
            </div>
          </div>
  
        </div>
      </div>
    </template>

    <template #footer>
      <div>
        <NuxtLink to="/list" class="msg-a">
          <span class="text-gray-500">查看留言</span><Icon name="bi:chevron-double-right" size="13" class="text-gray-500"></Icon>
        </NuxtLink>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {useStore} from '../stores/msg'
// import {useMessageStore} from '../stores/message'
const Msg = useStore()
// const Message = useMessageStore()
const router = useRouter()

const data = reactive({
  form: {
    id: '',
    type: 1,
    title: "",
    timer: "",
    content: "",
    phone: ''
  },
  list: []
})
const {form} = toRefs(data)

const selMType = (type)=>{
  data.form.type = type
}

const isButtonDisabled = computed(()=>{
  return !data.form.phone || !data.form.content || !data.form.title
})

// const getData = async () => {
//   let {data} = await useFetch(`/api/message`)
// }

const submit = async ()=>{
  console.log('isButtonDisabled: ', isButtonDisabled.value);
  if(!isButtonDisabled.value){
    data.form.id = Msg.megList?.length + 1
    data.form.timer = "2021/11/11"

    // const initList = await Message.getMessageData()
    // console.log('list: ', list);
    // list = [data.form, ...]

    Msg.$patch((state)=>{
      state.itemInfo = data.form,
      // state.megList.unshift(data.form)
      state.megList = [data.form, ...Msg.megList]
    })

    goListPage()
  }
}

const goListPage = ()=>{
  router.push('/list')
}
</script>