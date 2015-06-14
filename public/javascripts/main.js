function showForm(key){
  var block = document.querySelector('#block_'+key);
  Array.prototype.slice.call(block.querySelectorAll(".updateParam")).forEach(function(el){
    el.style.display = 'block';
  });
  Array.prototype.slice.call(block.querySelectorAll(".showParam")).forEach(function(el){
    el.style.display = 'none';
  });
}

function hideForm(key){
  var block = document.querySelector('#block_'+key);
  Array.prototype.slice.call(block.querySelectorAll(".updateParam")).forEach(function(el){
    el.style.display = 'none';
  });
  Array.prototype.slice.call(block.querySelectorAll(".showParam")).forEach(function(el){
    el.style.display = 'block';
  });
}

function toggle(el) {
  el.style.display = (el.style.display == 'none') ? 'block' : 'none'
}

