import React, {Component} from 'react';
import Header from "./Header";
import "../../styles/css/GettingStarted.css";

class GettingStarted extends Component {
    render(){
        return ( 
          <div className="gs-body">
          <Header/>
          <div className="gs-h-one-container">
            <h1 className="gs-hone"> Getting Started with Contentum </h1>
          </div>
            <p className="gs-p">  First, we want to thank you for choosing Contentum as your content management system!</p>
            <h1 className="gs-hone"> Blog or Page? </h1>
            <p className="gs-p">  You may be asking yourself, what is the difference between a blog and a page? A blog is a website that has posts. These posts may be added to at any time on your schedule, such        as weekly or daily. Usually, blogs have several posts appear on the homepage of a website at one time. This means everytime you write a new post it will appear on the homepage and      an older blog post will be pushed to the next page.

                Pages work more like a website that does not have a continuously changing homepage. This would be a good option for you if you are looking to have a website that is like a portfolio or informational page. Any time you make an update to the page, it will change the website but it will not push content to another page like a blog would. 
            </p>
            <h1 className="gs-hone"> After Signing Up </h1>
            <p className="gs-p"> Once you sign up and are logged in for the first time, you will be taken to a page where you can create a blog or a page. You can create as blogs or pages as you like. 

                To create a Blog, please click the “Create New Blog” button. This will prompt you to enter a title for your blog. Once you have created the blog, you can start writing new content right away. To create a new blog post, click the title of the blog and you will be taken to the blog dashboard. Here there is a new button, click on that to write a new blog post. Once you have a post written, you will be able to see it by clicking the history button. 

                If you decide to create a page, please click the “Create New Page” button. Once your new page is created, you can click on the page title to begin creating your new website. Unlike blogs, this will take you directly to the editor to begin writing.

                Don’t forget to click save when you are done writing!
            </p>
            <h1 className="gs-hone">Uploading photos</h1>
            <p className="gs-p">You can upload photos to both blogs and pages. When you are writing content, you will see an icon that has mountains and a sun, that is the button to press to upload photos. Once you have clicked that, you can then click the search file icon, which is to the right of the source field. Choose the photo you want to upload. You can upload the images in the place in the text you want them to appear. To delete a photo, click the photo and hit delete on your keyboard. To edit a photo, click the photo and an edit toolbar will appear at the bottom of the photo. 

            Photos are saved when you click save after you have finished writing. 
            </p>
            <h1 className="gs-hone"> Connecting to Your Website </h1>
            <p className="gs-p"> How do you get all this onto your own site? First, you need to get your site’s credentials. Go to settings wheel and a drop down will appear. Click on credentials. If you are using one of Contentum’s templates then you can open your index.html file. Enter the id of the site you want to appear on that template. The picture on this page shows you where this is located
            If you are using your own template, you will need to go to your index.html file and then find the body tags. It should look like this <pre>{`<body>`}</pre>. On the credential’s page copy the code between the body tags. 
            This should pull your content into your website. 
</p>
            <h1 className="gs-hone"> Use Caution When Deleting</h1>
            <p className="gs-p"> As you can see there are lots of options for deleting both whole blogs and pages and individual blog posts. We urge you to exercise caution when hitting that delete button. We do give you a warning, but once you click ok everything is gone forever! 
            </p>

            </div>)
    }
}

export default GettingStarted;