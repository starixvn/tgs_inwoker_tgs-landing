@Library('global-shared-library') _
def message = "";
pipeline {
    agent any
    environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "pgtgs/"
        Image = "tgs-landing"
        dockerhub = credentials('dockerhub')
    }

    stages {		    	
        stage('Prepare Env') {
            steps {
                sh "docker login -u ${dockerhub_USR} -p ${dockerhub_PSW}"
            }
        }	
        stage('Docker Build') {   
            steps {	  			    
                sh "docker build -t ${Registry}${Image}:${TAG} ."
            }
        }			
        stage('Docker Push') {   
            steps {	  
                sh "docker push ${Registry}${Image}:${TAG}"
            }
        }	
        stage('Deployment') {   
            steps {	  
                script {			
                    withKubeConfig([credentialsId: 'stag-k8s-config']) {
                        sh "kubectl set image deployment/lobby-tiger-landing lobby-tiger-landing=${Registry}${Image}:${TAG} --record -n staging"
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
