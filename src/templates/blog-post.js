import React from "react";
import moment from "moment";
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.markdownRemark;
    return (
        <Layout>
            <h1>{post.frontmatter.title}</h1>
            <h4 class="metadata">
              <>
                {post.frontmatter.author && <span> By {post.frontmatter.author}</span>}
                {post.frontmatter.date && <span> On {moment(post.frontmatter.date).format("LL")}</span>}
                
              </>
            </h4>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
    );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        date,
        author
      }
    }
  }
`;