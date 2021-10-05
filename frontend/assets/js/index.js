//TODO: view more function 
function getPercent(person={Name:"def",Quests:[]}) {
  var per = Math.round((person.Quests.length / 11) * 100);
  return per>=100?100:per;
}
var api_data = fetchDataAndSort().then((data)=>{
  // console.log(data);
  // destructuring 
  [first, second, third, ...rest] = [...data];
  // console.log(first);
  
  // get card data & vars
  var position_first_name = $("#n1");
  var position_first_badges = $("#b1");
  var position_second_name = $("#n2");
  var position_second_badges = $("#b2");
  var position_third_name = $("#n3");
  var position_third_badges = $("#b3");
  var leader_board = $(".leaderboard");
  
  function setTopThree() {
    position_first_name[0].innerHTML = first.Name.replace("GOOGLEUSER", "");
    position_first_badges[0].innerHTML = getPercent(first) + "%";
    position_second_name[0].innerHTML = second.Name.replace("GOOGLEUSER", "");
    position_second_badges[0].innerHTML = getPercent(second) + "%";
    position_third_name[0].innerHTML = third.Name.replace("GOOGLEUSER", "");
    position_third_badges[0].innerHTML = getPercent(third) + "%";
  }
  rest.map((person, index) => {
    var plaque = `<div class="plaque rounded-5">
  <div class="plaque-items rank">#${index + 4}</div>
  <div class="plaque-items name">${person.Name}</div>
  <div class="plague-items progress">
    <div class="progress-done" id="id_${index}">${person.Quests.length}</div>
  </div>
  </div>
  `;
    leader_board.append(plaque);
  });
  setTopThree();
}).then(()=>{
  for(var i=0;i<=rest.length;i++){
    var x = document.getElementById("id_"+i);
    var per = getPercent(rest[i]);
    x.style.width = per+"%";
    console.log(x);
  }
});












// .then(progressBar);

// function progressBar(){
// var progress = document.querySelector(".progress-done");
// progress.style.width = progress.getAttribute('data-done') + '%';
// progress.style.opacity = 1;

// }

// ((progress)=>{
//   progress.style.width = progress.attributes['data-done'] + '%';
//   progress.style.opacity = 1;
// });
//}

// console.log(api_data);
// var data = Object.values(default_obj.obj);
// function getPercent(person) {
//   if(person.Quests.length<=2)
//   return 0;
//   return Math.round((JSON.parse(person.Quests).length / 11) * 100);
// }

