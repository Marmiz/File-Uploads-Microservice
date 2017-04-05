/*jshint esversion: 6 */
new Vue ({
  el: '#app',

  data: {
    file: {},
    inMemory: []
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
      })
       .then(function(response){
         this.file = response.data;
         this.fetchUploaded();
       }.bind(this));
    },

    fetchUploaded(){
      axios.get('/uploaded')
              .then(function(response){
                this.inMemory = response.data;
              }.bind(this));
    },

    deleteDB(file){
      axios({
        method: 'post',
        url: '/uploads',
        data: fd
      })
    },

    isEmpty(obj){
      return(Object.keys(obj).length === 0);
    },

    convertSize(s){
      return parseInt(s/1000);
    }
  },

  mounted(){
    // fetch if somethin's in memory
    this.fetchUploaded();
  }
});
