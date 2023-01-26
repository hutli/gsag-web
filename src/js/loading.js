var elem_before = document.getElementById("before");
var elem_after = document.getElementById("after");
var elem_marker = document.getElementById("marker");
var elem_block_solid = '<span class="block solid"></span>';
var elem_block_empty = '<span class="block empty"></span>';
var min_elem_solid = 50;

var test_procent_progress = 0;

elem_after.innerHTML = elem_block_empty.repeat(min_elem_solid);

setInterval(function () {
  test_procent_progress++;
  progress_bar();
}, 100);

function progress_bar() {
  if (test_procent_progress <= min_elem_solid) {
    switch (test_procent_progress) {
      case 1:
        elem_marker.innerHTML = elem_block_solid;
        break;
      case min_elem_solid:
        elem_before.innerHTML += elem_block_solid;
        elem_marker.firstElementChild.remove();
        break;
    }

    elem_after.firstElementChild.remove();

    if (test_procent_progress != 1) {
      elem_before.innerHTML += elem_block_solid;
    }
  } else {
    return false;
  }
}
