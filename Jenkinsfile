pipeline {
    agent any

    environment {
        NODE_VERSION = '20.11.1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
                    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

                    nvm install $NODE_VERSION
                    nvm use $NODE_VERSION
                    npm install
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run generate'
                }
            }
        }

        stage('Backup') {
            steps {
                script {
                    sshagent(['instabucks']) { // Use the ID you assigned to the SSH key in Jenkins Credentials
                        sh '''
                        DATE=$(date +%Y%m%d-%H%M%S)
                        ssh root@instabucks.co.zw "cp -r /var/www/html/storeflex_jt /var/www/html/backups/storeflex_jt_$DATE"
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(['instabucks']) { 
                        sh 'scp -r ./dist root@instabucks.co.zw:/var/www/html/storeflex_jt'
                    }
                    
                }
            }
        }
    }
}
