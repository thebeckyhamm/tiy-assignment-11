


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

        // START LEVEL 2 computers, home entertainment, fiction
        if (lvl1Category.children) { 
            lvl2Data = lvl1Category.children;
            //console.log(lvl2Data);
            $lvl2Ul = $("<ul />");

            _.each(lvl2Data, function(lvl2Category) {
                var $lvl3Ul, $lvl3Li, lvl3Data;
                $lvl2Li = $("<li />");
                $lvl2Li.append("<span>" + lvl2Category.name + "</span>");

                // START LEVEL 3
                if (lvl2Category.children) {
                    lvl3Data = lvl2Category.children;
                    //console.log(lvl3Data);
                    $lvl3Ul = $("<ul />");

                    _.each(lvl3Data, function(lvl3Category) {
                        var $lvl4Ul, $lvl4Li, lvl4Data;
                        $lvl3Li = $("<li />");
                        $lvl3Li.append("<span>" + lvl3Category.name + "</span>");
                        //console.log($lvl3Li[0]);

                        // START LEVEL 4
                        if (lvl3Category.children) {
                            lvl4Data = lvl3Category.children;
                            $lvl4Ul = $("<ul />");

                            _.each(lvl4Data, function(lvl4Category){
                                var $lvl5Ul, $lvl5Li, lvl5Data;
                                $lvl4Li = $("<li />");
                                $lvl4Li.append("<span>" + lvl4Category.name + "</span>");

                                if(lvl4Category.children) {
                                    lvl5Data = lvl4Category.children;
                                    $lvl5Ul = $("<ul />");

                                    _.each(lvl5Data, function(lvl5Category) {
                                        $lvl5Li = $("<li />");
                                        $lvl5Li.append("<span>" + lvl5Category.name + "</span>");
                                        $lvl5Ul.append($lvl5Li);
                                    });

                                    $lvl4Li.append($lvl5Ul);
                                }


                                $lvl4Ul.append($lvl4Li);

                            });

                            $lvl3Li.append($lvl4Ul);

                        } // END LEVEL 4



                        $lvl3Ul.append($lvl3Li);
                    });

                    $lvl2Li.append($lvl3Ul);

                } // END LEVEL 3: macbook air, hdtvs

                $lvl2Ul.append($lvl2Li);
            });

            // append the level 2 ul to the level 1 li
            $rootLi.append($lvl2Ul);

        } // END LEVEL 2

        // append root li to root ul
        $rootUl.append($rootLi);

    });

    return $rootUl;
};