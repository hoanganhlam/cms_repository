import Vue from 'vue'
import moment from "moment";
import { Toast, Tooltip, Skeleton } from 'buefy';

Vue.mixin({
    methods: {
        cleanURI(url) {
            if (url) {
                return url.split("?")[0].split("#")[0];
            }
            return null
        },
        cleanURL(str) {
            return str.replace(/^https?:\/\//, '').replace(/\/+$/, '')
        },
        timeSince(date) {
            let seconds = moment().diff(this.momentTime(date), 'seconds', false);
            return this.convertTime(seconds)
        },
        convertTime(seconds) {
            var interval = Math.floor(seconds / 31536000);
            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " month";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " day";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
        capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        convertName(user) {
            if (user.profile && user.profile.nick) {
                return user.profile.nick
            }
            if (user.first_name || user.last_name) {
                return user.first_name + ' ' + user.last_name
            }
            return user.username
        },
        formatDate(dateStr) {
            return new moment(dateStr, 'YYYY-MM-DD').format('YYYY-MM-DD')
        },
        cleanData(data, fields) {
            let out = {};
            if (typeof fields === 'undefined') {
                fields = Object.keys(data)
            }
            fields.forEach(i => {
                if (typeof data[i] !== 'undefined') {
                    if (['created', 'updated', 'start_date', 'due_date'].includes(i)) {
                        out[i] = this.momentTime(data[i]).format('YYYY-MM-DD HH:mm')
                    } else if (Array.isArray(data[i])) {
                        out[i] = data[i].map(x => {
                            return x.id ? x.id : x
                        })
                    } else if (typeof data[i] === 'object' && data[i] && data[i].id) {
                        out[i] = data[i].id
                    } else {
                        out[i] = data[i]
                    }
                }
            });
            return out
        },
        cleanFilter(data, fields) {
            let out = {};
            if (typeof fields === 'undefined') {
                fields = Object.keys(data)
            }
            fields.forEach(i => {
                if (typeof data[i] !== 'undefined') {
                    if (Array.isArray(data[i])) {
                        out[i] = data[i].map(x => {
                            if (x.id) return x.id;
                            else if (x.value) return x.value;
                            else return x;
                        })
                    } else if (typeof data[i] === 'object' && data[i] !== null) {
                        if (data[i].id) {
                            out[i] = data[i].id
                        } else if (typeof data[i].value !== 'undefined') {
                            out[i] = data[i].value
                        } else out[i] = data[i]
                    } else {
                        out[i] = data[i]
                    }
                }
            });
            return out
        },
        convertDate(date) {
            if (date) {
                return new Date(date + ' UTC')
            }
            return null
        },
        momentTime(date) {
            return moment(date, 'YYYY-MM-DDTHH:mm').utc()
        },
        formatMomentTime(m) {
            return m.format('YYYY-MM-DD HH:mm:ss')
        },
        fancyTimeFormat(time) {
            let h = ~~(time / 3600);
            let m = ~~((time % 3600) / 60);
            let s = ~~time % 60;
            if (h > 24) {
                return "00:00:00"
            }
            let ret = (h < 10 ? "0" : "");
            ret += "" + h + ":" + (m < 10 ? "0" : "");
            ret += "" + m + ":" + (s < 10 ? "0" : "");
            ret += "" + s;
            return ret;
        },
        avatarName(name, length) {
            let matches = name.match(/\b(\w)/g);
            if (length) {
                return matches.join('').substr(0, length)
            }
            return matches.join('')
        },
        getSD(data, field) {
            if (!Boolean(data)) {
                return 0
            } else {
                if (field === 'download') {
                    return data.downloads[data.downloads.length - 1].count
                } else if (field === 'star') {
                    return data.starsCount
                }
            }
        },
        getIMG(instance, size) {
            if (size && instance.sizes && instance.sizes[size]) {
                return instance.sizes[size]
            }
            return instance.path
        },
        onCopyDone() {

        }
    },
    computed: {}
});

Vue.use(Toast);
Vue.use(Tooltip);
Vue.use(Skeleton);
