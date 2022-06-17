function Info() {
    return (
        <div className="info">
            <div className="info-title">
                <h1>Information</h1>
            </div>
            <div className="info-info">
                <a>
                Improve the user experience of amazon connect customers, giving the chance to better understand agent calls and use them as training for future agents, by developing a complementary webapp to Amazon Connect Services that is capable of recording, storing and sorting agent calls within said app for future observation.
                
                Infrastructure:
                - Web hosting
                - Application
                - Database
                - 3rd Party APIs
                - Given 300 AWS Credits per full development team of then course, these are the following costs for the region of US West (N. California) by using the AWS pricing calculator:
                - Amazon API Gateway: Considering for HTTPS APIs; 25 thousand requests per month, average size request of 10240 KB per KB, for REST APIs; 25 thousand requests per month, the total monthly cost comes up to 0.59 USD.
                - AWS Lambda: To be defined, as its cost can't be fully defined yet with the limited technical knowledge of it.
                - AWS Amplify: Considering 50 build minutes per month, 100 GB of data storage per month, 100 GB of data served per month, the total monthly cost comes up to 17.80 USD.
                - Amazon DynamoDB: Considering the features of full backup and restore with 5 GB capacity, as well as an on demand capacity, including a storage capacity of 15 GB, an average item size of 200 KB, 100 thousand writes per month, 500 thousand reads per month, the total monthly cost comes up to 32.38 USD.
                - Amazon S3: Considering the standard s3 feature, data transfer feature, and 1 TB of storage per month, the total monthly cost comes up to 23.55 USD.
                With all of this said, the total budget used out of the 300 USD is 74.32 USD per month, leaving the team with 225.68 USD to spare for the following months. 

                </a>
            </div>
        </div>
    )
}

export default Info