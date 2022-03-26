import {useEffect, useState} from "react";
import axios from "axios";

const Post = (info) => {
    useEffect(() => {
            axios
                .post(
                    "http://localhost:1337/admin", {info}
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []
    );
}
export default Post;