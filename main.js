


$(function(){

    $.ajax("data.json", {
        success: function(data) {
            //console.log("data", data);
            var tree = buildTree(data);
            $("body").html(tree);
        }
    });





});


var buildTree = function(data) {
    var $rootUl, $rootLi;

    $rootUl = $("<ul />");

    _.each(data, function(lvl1Category) { // electronics, books
        var $lvl2Ul, $lvl2Li, lvl2Data;
        $rootLi = $("<li />");
        $rootLi.append("<span>" + lvl1Category.name + "</span>");


        if (lvl1Category.children) { // computers, home entertainment, fiction
            lvl2Data = lvl1Category.children;
            //console.log(lvl2Data);
            $lvl2Ul = $("<ul />");

            _.each(lvl2Data, function(lvl2Category) {
                var $lvl3Ul, $lvl3Li, lvl3Data;
                $lvl2Li = $("<li />");
                $lvl2Li.append("<span>" + lvl2Category.name + "</span>");


                if (lvl2Category.children) {
                    lvl3Data = lvl2Category.children;
                    //console.log(lvl3Data);
                    $lvl3Ul = $("<ul />");

                    _.each(lvl3Data, function(lvl3Category) {
                        $lvl3Li = $("<li />");
                        $lvl3Li.append("<span>" + lvl3Category.name + "</span>");
                        //console.log($lvl3Li[0]);
                        $lvl3Ul.append($lvl3Li);
                    });

                    $lvl2Li.append($lvl3Ul);

                } // end level 3: macbook air, hdtvs



                $lvl2Ul.append($lvl2Li);
            });

            // append the level 2 ul to the level 1 li
            $rootLi.append($lvl2Ul);

        } // end if there are lvl1 chilcren

        // append root li to root ul
        $rootUl.append($rootLi);

    });

    return $rootUl;
};