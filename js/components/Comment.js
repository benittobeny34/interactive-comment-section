export default {
    name: 'Comment',
    template: `
    <div>
            <div>
                    <div class="comment flex flex-row justify-between bg-white m-2 p-2 rounded-xl">
                            <div class="votes flex flex-col justify-between m-2 bg-gray-300 text-center rounded-2xl w-18 h-32">
                                <span class="p-2 cursor-pointer hover:text-blue-600" @click="++comment.score">+</span>
                                <span class="p-2">{{ comment.score }}</span>
                                <span class="p-2 cursor-pointer hover:text-blue-600" @click="--comment.score">-</span>
                            </div>
                            <div class="info m-2 flex-1">
                                <div class="user-info flex flex-row justify-between">
                                    <div class="flex flex-row justify-between">
                                        <img class="rounded-2xl p-2" :src="comment.user.image.png" alt="" width="50"
                                             height="50">
                                        <span class="username p-2 font-semibold">{{ comment.user.username }}
                                        <label v-show="commentedByCurrentUser" for="currentUser" class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900" >you</label>
                                        </span>
                                        <span class="timestamp p-2">{{ comment.createdAt }}</span>
                                    </div>
                                    <div class="reply">
                                        <button v-show="commentedByCurrentUser"  class="p-2 text-red-800 font-semibold">
                                            <img src="./images/icon-delete.svg" alt="" class="inline m-1">
                                            <span class="m-1">Delete</span>
                                        </button>
                                        <button v-show="commentedByCurrentUser" class="p-2 text-blue-800 font-semibold">
                                            <img src="./images/icon-edit.svg" alt="" class="inline m-1">
                                            <span class="m-1">Edit</span>
                                        </button>
                                        <button v-if="!commentedByCurrentUser"  class="p-2 text-blue-800 font-semibold" @click="showReplySection = !showReplySection">
                                            <img src="./images/icon-reply.svg" alt="" class="inline m-1">
                                            <span class="m-1">Reply</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="description">
                                    <p>
                                    <span v-if="comment.replyingTo">
                                    <a href="#" class="font-semibold text-blue-600">@{{comment.replyingTo}}</a>
                                    </span>
                                    {{ comment.content }}</p>
                                </div>
                            </div>
                    </div>
                    <div class="reply-section flex flex-row justify-between items-center bg-white m-2 p-2 rounded-xl" v-show="showReplySection">
                        <img class="rounded-2xl p-2" src="./images/avatars/image-amyrobson.png" alt="" width="50" height="50">
                        <div class="flex-1">
                            <textarea name="reply" id="" rows="3" cols="65" class="border p-2" placeholder="Add your thoughts here" v-model="reply"></textarea>
                        </div>
                        <button class="m-1 p-2 form outline rounded bg-blue-600 text-white text-sm" @click="addReply">REPLY</button>
                    </div>
                    <div v-if="comment?.replies?.length" class="my-4 ml-8 border-l pl-8">
                            <comment v-for="comment in comment.replies" :comment="comment" :user="user" :key="comment.id"></comment>
                    </div>
        </div>
    </div> 
    `,
    props: {
        comment: {
            type: Object
        },
        user: {
            type: Object
        }
    },
    data() {
        return {
            reply: '',
            showReplySection: false,
        }
    },
    computed: {
        commentedByCurrentUser() {
            return this.comment.user.username == this.user.username;
        }
    },
    methods: {
        addReply() {
            this.comment.replies.push({
                "id": 10 * Math.random(),
                "content": this.reply,
                "createdAt": "1 second ago",
                "score": 1,
                "replyingTo": this.comment.user.username,
                "user": this.user,
                "replies": []
            })
            this.reply = '';
            this.showReplySection = false
        }
    }
}