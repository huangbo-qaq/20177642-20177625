// json接口
var treeData = [{
    "text" : "",
    "nodes" : [{
        "text" : "",
        "nodes" : [
            {
                "text" : ""
            }
        ]
    }]
}];

function add_div(treeId) {
    var e = document.getElementById("tree");
    var div = document.createElement("div");
    div.id = treeId;
    div.innerHTML = e.innerHTML;
    document.getElementById("tree").appendChild(div);
}

function getData() {
    var texts = document.getElementById("val").value;
    // 按空白行分割不同的树
    var tree = texts.split('\n\n');

    for (var i = 0; i < tree.length; i++)
    {
        // 第i棵树
        var row = tree[i].split('\n');
        // "导师："，"级博士生："，"级硕士生："，"级本科生："和"、"
        // 导师
        var teacher = row[0].split("导师：");
        // 学生
        var len = row.length;
        var nodes = [];
        for (var j = 1; j < len; j++)
        {
            // 按前后分割
            var information = row[j].split("：");
            // 前
            //degreeAndGrade.push(information[0]);
            // 后
            var stuName = information[1].split("、");
            var nameList = [];
            for (var k = 0; k < stuName.length; k++)
            {
                var name = stuName[k];
                nameList.push({ "text" : name });
            }
            nodes.push(
                {
                    "text" : information[0],
                    "nodes" : nameList
                }
            );
        }
        treeData[0]["text"] = teacher[1];
        treeData[0]["nodes"] = nodes;

        var treeId = "tree_" + i;
        add_div(treeId);

        $("#" + treeId).treeview({
            color: "#4B0082",
            expandIcon: 'glyphicon glyphicon-chevron-right',
            collapseIcon: 'glyphicon glyphicon-chevron-down',
            emptyIcon: 'glyphicon glyphicon-user',
            showBorder: false,
            data: treeData
        });
    }
}
