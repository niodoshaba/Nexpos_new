
window.addEventListener('load', function () {

  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status == 200) {
      var resAllData = JSON.parse(xhr.responseText);
      var resTable = document.querySelector('#resTable');
      var len = resAllData.length;
      var str = "";

      for (i = 0; i < len; i++) {
        var content = ` <tr>
                          <td>${resAllData[i].CUS_FIRST}${resAllData[i].CUS_LAST}</td>
                          <td>${resAllData[i].CUS_GEN}</td>
                          <td>${resAllData[i].CUS_PHONE}</td>
                          <td>${resAllData[i].RES_NUM}</td>
                          <td>${resAllData[i].RES_DATE}</td>
                          <td>${resAllData[i].RES_NOTE}</td>
                        </tr> `

        console.log(content);
        str += content;
      };

      resTable.innerHTML += str;
    }

  }
  xhr.open("get", "./js/reservationRecord.php", true);
  xhr.send(null);

})
