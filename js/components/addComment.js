export default {
    template: `
    <div class="reply-section flex flex-row justify-between items-center bg-white m-2 p-2 rounded-xl">
            <img class="rounded-2xl p-2" :src="currentUser.image.png" alt="" width="50" height="50">
            <div class="flex-1">
                <textarea name="reply" id="" rows="3" cols="65" class="border p-2" placeholder="Add a comment" v-model="comment"></textarea>
            </div>
            <button class="m-1 p-2 form outline rounded bg-blue-600 text-white text-sm" @click="addComment">SEND</button>
        </div>
        `,
    props: {
        currentUser: {
            type: Object
        }
    },
    data() {
        return {
            comment: ''
        }
    },

    methods: {
        addComment() {
            this.$emit('addComment', this.comment)
            this.comment = '';
        }
    }
}