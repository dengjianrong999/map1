$(function (e) {

  var map = new BMap.Map("shanxiMap", {
    minZoom: 7
  });
  map.centerAndZoom(new BMap.Point(113.041659,37.399766), 9);
  map.enableScrollWheelZoom();
  // map.addEventListener("click", function (e) {
  // alert(e.point.lng+','+e.point.lat)
  // });
  // 行政区划边界
  var townArr = jZJson.features;
  var townsArr = [];
  for (var k = 0; k < townArr.length; k++) {
    for (var j in townArr[k]) {
      if (j === 'geometry') {
        var townPosArr = townArr[k]['geometry'].coordinates[0][0]; // 每个镇坐标 19
        console.log(townPosArr)
        var townPos = '';
        for (var i = 0; i < townPosArr.length; i++) { //
          if (i == townPosArr.length - 1) {
            townPos += (townPosArr[i][0]) + ',' + (townPosArr[i][1]);
          } else {
            townPos += (townPosArr[i][0]) + ',' + (townPosArr[i][1]) + ';'
          }
        }
        townsArr.push(townPos);
      }
    }
  }
  var color = ['#ffbe4d', '#cc9fff', '#75eb72', '#f996a4', '#c9a1ff', '#ffbe4d', '#f996a4', '#fcff00',
    '#fcaf25', '#75eb72', '#f996a4', '#adda35', '#c9a1ff', '#fcff00', '#4fc1e9', '#91c7ae',
    '#749f83', '#ca8622', '#bda29a',
  ];
  /* 镇级 */
  for (var i = 0; i < townsArr.length; i++) {
    (function (i) {
      var ply1 = new BMap.Polygon(townsArr[i], {
        strokeWeight: 2,
        strokeColor: "#72cef7",
        fillColor: color[i],
        fillOpacity: 0.8
      }); //建立多边形覆盖物
      map.addOverlay(ply1); //添加覆盖物
      // map.setViewport(ply1.getPath());    //调整视野    
    })(i);
  }
  // 行政区划边界

  var styleJson = [{
    "featureType": "land",
    "elementType": "all",
    "stylers": {
      "color": "#e6eef6ff"
    }
  },
  {
    "featureType": "local",
    "elementType": "all",
    "stylers": {
      "color": "#d6d8f4ff"
    }
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": {
      "color": "#d9fbc9ff"
    }
  },
  {
    "featureType": "highway",
    "elementType": "all",
    "stylers": {
      "color": "#c8cdf8ff"
    }
  }
  ]
  map.setMapStyle({ styleJson: styleJson });



});

