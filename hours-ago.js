function howLongAgo (past) {
    let hour = Math.floor(((+ new Date()) - past)/3.6e+6)
    if (hour === 1) {
      return `made ${hour} hour ago`
    }
    else if (hour > 1) {
      return `made ${hour} hours ago`
    }
    else {
      let minute = Math.floor(((+ new Date()) - past)/60000)
      if (minute === 1) {
        return `made ${minute} minute ago`
      }
      else if (minute > 1) {
        return `made ${minute} minutes ago`
      }
      else {
        return `made a few seconds ago'`
      }
    }
  }

let yesterday = 1555633928746
let justNow = 1555700471501

// var hours = yesterday.getHours()
// var hoursNow = todayNow.getHours()

// var diff = (today - yesterday)

console.log(howLongAgo(yesterday), howLongAgo(justNow), + new Date())