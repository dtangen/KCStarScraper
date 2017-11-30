$(document).ready(function () {

    var articleList = [];
    var articleID = "";
    var article = "";
    var previousARticle = 0;
    var currentArticle = 0;
    var nextArticle = 0;

    $('#comments').addClass('hidden');

    $.getJSON('/scrape', function () {
    });

    $(document).on('click', '#getArticles', function () {
        $.getJSON('/articles', function (data) {
            articleList = data;
            article = articleList[0];
            showArticle(article);
        });
    });

    $(document).on('click', '.previous', function () {
        article = articleList[previousArticle];
        currentArticle = nextArticle;
        showArticle(article);
    });

    $(document).on('click', '#addComment', function () {
        if ($('#commentText').val() != ' ') {
            var name = $('#name').val();
            var comment = $('#commentText').val();
            $.post("/addcomment/" + articleID, { name: name, comment: comment }, function (e) {
                e.preventDefault();
            });
            $('#name').val('');
            $('#commentText').val('');
            showComments(articleID);
        }
    });

    $(document).on('click', '.deletecomment', function () {
        commentID = this.id;
        $.ajax({
            method: "GET",
            url: "/deletecomment/" + commentID
        }).done(function (data) {
        })
        showComments(articleID);
    });

    var showArticle = function (article) {
        // $('#title').text(article.title);
        $('#image').removeClass("hidden");
        $('#image').attr('src', article.imageLink);
        $('#summary').text(article.summary);
        $('#readArticle').removeClass("hidden");
        $('#article').attr('href', article.articleLink);
        $('#getArticles').addClass("hidden");
        $('#navigation').empty();
        previousArticle = currentArticle - 1;
        if (previousArticle >= 0) {
            $('#navigation').append('<button id=" ' + previousArticle + '" class="btn btn-primary previous">Previous Article</button>');
        } else {
            $('#navigation').append('<button id=" ' + previousArticle + '" class="btn btn-primary disabled previous">Previous Article</button>');
        }
        nextArticle = currentArticle + 1;
        if (nextARticle < articleList.length) {
            $('#navigation').append('<button id=" ' + nextArticle + '" class=btn btn-primary pull-right next">Next Article</button>');
        } else {
            $('#navigation').append('<button id=" ' + nextArticle + '" class=btn btn-primary pull-right disabled next">Next Article</button>');
        }
        articleID = article._id;
        showComments(articleID);
    }

    var showComments = function(articleID) {
        $('#comments').removeClass("hidden");
        $('#articleComments').empty();
        var commentText = '';
        $.getJSON('comments/'+articleID, function(data) {
            for(var i = 0; i < data.length; i++) {
                commentText = commentText + 'div class = "well"><span id="'+data[i]._id+'" class="glyphicon-remove text-danger deletecomment"></span> '+data[i].comment+' - '+data[i].name+'</div>';
            }
            $('#articleComments').append(commentText);
        });
    }
});