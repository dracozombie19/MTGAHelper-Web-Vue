<template>
    <div>
        <h4 class="title is-4">
            <i class="fas fa-envelope"></i> Leave a message, feedback is appreciated </h4>
        <h5 class="subtitle is-5"> To get a reply, be sure to include your email or some id (reddit, twitch, etc.) </h5>
        <h6 class="title is-6"> For live interaction and to exchange with the community, you are welcome to join the <a href="https://discord.gg/GTd3RMd" target="_blank"> Discord server <i class="fab fa-discord my-float" style="margin-top:10px;"></i></a>
        </h6>
        <div class="field">
            <div class="control">
                <label class="label">Your message</label>
                <textarea v-model="contactMessage"
                          rows="12" class="textarea"
                          :class="contactMessage.length === 0 ? 'is-danger' : 'is-success'"></textarea>
            </div>
        </div>
        <div class="field has-addons">
            <div class="control">
                <button class="button is-info"
                        :disabled="contactMessage.length === 0 || loadingData"
                        @click="sendMessage();">Send message</button>
            </div>
            <div class="control">
                <label class="label"
                       style="padding:0.5rem 0 0 0.5rem;">Thanks!</label>
            </div>
        </div>
    </div>
</template>

<script>
    import ApiService from '@/common/ApiService';

    export default {
        name: 'Contact',
        props: [],
        data() {
            return {
                contactMessage: '',
                loadingData: false
            };
        },
        methods: {
            sendMessage() {
                console.warn('sendMessage');
                this.loadingData = true;

                ApiService.sendAjaxPost(
                    '/api/Misc/Message',
                    {
                        Message: this.contactMessage
                    },
                    null,
                    (statuscode, body) => {
                        if (statuscode === 200) {
                            this.loadingData = false;
                            this.$toasted.show('Message sent!', {
                                type: 'success'
                            });
                        } else {
                            this.loadingData = false;
                            this.$toasted.show(`${statuscode} - ${body}`, {
                                type: 'error'
                            });
                        }
                    }
                );
            }
        }
    };
</script>
