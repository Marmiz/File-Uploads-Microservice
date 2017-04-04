/*jshint esversion: 6 */
new Vue ({
  el: '#app',

  data: {
    skills: []
  },

  methods: {
    upload(e){
      const fd = new FormData();
      fd.append('file', e.target.files[0]);
      // Send a POST request
      axios({
        method: 'post',
        url: '/uploads',
        name: 'avatar',
        data: fd
      });
    }
  },

  mounted(){
    //make an ajax requst to /skills
      axios.get('/skills')
              .then(function(response){
                this.skills = response.data;
              }.bind(this))
              .catch(function(error){
                console.log(error);
              });
  }
});
