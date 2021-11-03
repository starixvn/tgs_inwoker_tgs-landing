def message = "";
pipeline {
    agent any
    environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "registry.gitlab.com/rayprosoft/turnkey-gaming-system/"
        Image = "tgs-landing"
        gitlab_user_pwd = credentials('gitlab-user-pwd')
    }

    stages {		    	
        stage('Prepare Env') {
            steps {
                sh "sudo docker login registry.gitlab.com -u ${gitlab_user_pwd_USR} -p ${gitlab_user_pwd_PSW}"
            }
        }	
        stage('Docker Build') {   
            steps {	  			    
                sh "sudo docker build -t ${Registry}${Image}:${TAG} ."
            }
        }			
        stage('Docker Push') {   
            steps {	  
                sh "sudo docker push ${Registry}${Image}:${TAG}"
            }
        }	
        stage('Deployment') {   
            steps {	  
                script {			
                    withKubeConfig([credentialsId: 'stag-k8s-config']) {
                        sh "kubectl set image deployment/lobby-21gen-landing lobby-21gen-landing=${Registry}${Image}:${TAG} --record -n prod"
                    }
                }
            }
        }	
    }
    post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}

def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")

    withCredentials([string(credentialsId: "telegramToken", variable: "TOKEN"), string(credentialsId: "telegramChatId", variable: "CHAT_ID")]) {

        response = httpRequest (consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'GET',
                url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}",
                validResponseCodes: '200')
        return response
    }
}
