"use client";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import React, { useState } from "react";
import ViewBlog from "./view-blog";
import AddBlogs from "./Add-blog";
import { IBlog } from "types/general";
import { ISUBCATEGORY } from "types/cat";

const Mainpage = ({blogs,subCategories}:{blogs:IBlog[],subCategories:ISUBCATEGORY[]}) => {
  const [selecteMenu, setselecteMenu] = useState<string>("All Blogs");
  const [editblog, setEditblog] = useState<IBlog | undefined>();
  return (
    <DefaultLayout>
      {selecteMenu == "All Blogs" ?
       <ViewBlog setselecteMenu={setselecteMenu} blogs={blogs} setEditblog={setEditblog}/> :
       <AddBlogs setselecteMenu={setselecteMenu}  editblog={editblog} subCategories={subCategories}/>}
    </DefaultLayout>
  );
};

export default Mainpage;
