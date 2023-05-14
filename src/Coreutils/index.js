const Coreutils =function() {
  const random=(start,end)=> {
    return Math.floor(Math.random() * (start - end + 1) + end)
  }

  const toss=()=> {
    let num = random(0,10)
    if(num<5) return true 
    else return false
  }

  return {random,toss}
  
}
module.exports = Coreutils