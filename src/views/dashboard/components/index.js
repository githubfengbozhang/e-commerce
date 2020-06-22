export default {
  name: '',
  data () {
    return {
      form: {
        broadcast: [
          {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }, {
            number: 0,
            day: ''
          }
        ],
        phbList: [
          {
            phb: '',
            number: ''
          }, {
            phb: '',
            number: ''
          }, {
            phb: '',
            number: ''
          }, {
            phb: '',
            number: ''
          }, {
            phb: '',
            number: ''
          }
        ],
        zje: ''
      }
    }
  },
  mounted () {
    if (JSON.parse(window.localStorage.getItem('broadcast'))) {
      this.form.broadcast = JSON.parse(window.localStorage.getItem('broadcast'))
    }

    if (JSON.parse(window.localStorage.getItem('phbList'))) {
      this.form.phbList = JSON.parse(window.localStorage.getItem('phbList'))
    }

    console.log(this.form.phbList)
    this.form.zje = JSON.parse(window.localStorage.getItem('zje'))
  },
  methods: {
    onSubmit () {
      console.log(this.form)
      window.localStorage.setItem("broadcast", JSON.stringify(this.form.broadcast));
      const broadcastTime = this.form.broadcast.map(item => {
        return item.day;
      });
      window.localStorage.setItem("broadcastTime", JSON.stringify(broadcastTime));
      const broadcastNumber = this.form.broadcast.map(item => {
        return item.number;
      });
      window.localStorage.setItem("broadcastNumber", JSON.stringify(broadcastNumber));




      window.localStorage.setItem("phbList", JSON.stringify(this.form.phbList));
      const phbPhb = this.form.phbList.map(item => {
        return item.phb;
      });
      window.localStorage.setItem("phbPhb", JSON.stringify(phbPhb));
      const phbNumber = this.form.phbList.map(item => {
        return item.number;
      });
      window.localStorage.setItem("phbNumber", JSON.stringify(phbNumber));

      window.localStorage.setItem("zje", this.form.zje)
    }
  }
}