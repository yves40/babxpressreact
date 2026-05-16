#---------------------------------------------------------------------------------------
#   deploy.sh
#---------------------------------------------------------------------------------------
#   Params
#---------------------------------------------------------------------------------------
version="deploy.sh, May 16 207 : 1.04 "
. deployparams
#---------------------------------------------------------------------------------------
#   Some parameters
#---------------------------------------------------------------------------------------
lastcommand=""
DATESIGNATURE=`date +"%Y-%m-%d"`
#---------------------------------------------------------------------------------------
#   Running under cygwin ?
#---------------------------------------------------------------------------------------
if [ ! -z $OSTYPE ]
then
    if [ $OSTYPE == "cygwin" ]
    then
        alias clear='cmd /c cls'
    fi
fi
if [ ! -f $LOCALO2LOGS ]
then
  touch $LOCALO2LOGS
  log "ADMIN: Log file $LOCALO2LOGS initialized for Ratoon admin"
fi
#---------------------------------------------------------------------------------------
#   Some utility routine
#---------------------------------------------------------------------------------------
# Logger
#---------------------------------------------------------------------------------------
log() 
{
        echo "`date` : $version $1" >> $LOCALO2LOGS
        echo "`date` : $1"
}
#---------------------------------------------------------------------------------------
#   Main menu 
#---------------------------------------------------------------------------------------
menu()
{
  clear
  echo 
  echo "[ $version ]"
  echo "[ `date` ]"
  echo 
  echo "-------------------------------------------------------------------------------"
  echo " D E P L O Y "
  echo "-------------------------------------------------------------------------------"
  echo "  0 / Deploy React proto to O2switch"
  echo "-------------------------------------------------------------------------------"
  echo " L O G S"
  echo "-------------------------------------------------------------------------------"
  echo "  log                  View all actions log" 
  echo "  latestlog            View latest actions log" 
  echo
  echo
}
#---------------------------------------------------------------------------------------
#   Start requested action 
#---------------------------------------------------------------------------------------
parsecommand() {
  command=`echo $1 | tr A-Z a-z`
  case "$command" in 
    '0')        deployTarFile
                ;;
    'log')      echo
                less $LOCALO2LOGS
                ;;    
    'latestlog') echo
                tail -n 10 $LOCALO2LOGS
                ;;    
    'x')        echo;echo "Latest actions";echo
                exit 0
                ;;    
    *)          log "ERR: Unknown command"
                ;;
  esac
  echo; ANSWER=`./ask.sh "Back to menu <CR> "`
}
#---------------------------------------------------------------------------------------
#   S U B   R O U T I N E S
#---------------------------------------------------------------------------------------
deployTarFile() {
  tar cv -f $DATESIGNATURE-babook.zip -C .. client/dist server/server.js server/services/
  tar tvf $DATESIGNATURE-babook.zip
  scp $DATESIGNATURE-babook.zip $O2USER@$O2HOST:$REMOTEPROD/$DATESIGNATURE-babook.zip
  ssh -x "$O2USER@$O2HOST" <<-EOF
    ls -l ~/BAB/baboulebook/babweb/*.zip
    cd ~/BAB/baboulebook/babweb
    tar xvf $DATESIGNATURE-babook.zip
    cd $REMOTEPROD/client
    npm install
    cd $REMOTEPROD/server
    npm install
    exit
EOF
}
#---------------------------------------------------------------------------------------
#   C H E C K   A L L   R E Q U I R E D   V A R I A B L E S    A R E    S E T 
#---------------------------------------------------------------------------------------
checkEnvironmentVariables()
{
  if [ -z $LOCALWEBDIR ]; then
    log "ERR: \$LOCALWEBDIR not set"
    log "INF: Set it to the location of your web project."
    log "INF: For example, \$HOME/yourporjectroot"
    exit 1
  fi
  if [ -z $LOCALO2LOGS ]; then
    log "ERR: \$LOCALO2LOGS not set"
    log "INF: Set it to the location of complete path of the admin log file."
    log "INF: For example, /tmp/O2ratoon-admin.log"
    exit 1
  fi
  if [ -z $REMOTEPROD ]; then
    log "ERR: \$REMOTEPROD not set"
    log "INF: Set it to the location of the BAB environment ON THE REMOTE SYSTEM."
    log "INF: For example, PROD/bomerle"
    exit 1
  fi
  if [ -z $LOCALBACKUPDIR ]; then
    log "ERR: \$LOCALBACKUPDIR not set"
    log "INF: Set it to the location of your backup files."
    log "INF: For example, \$HOME/bomerleprocs/backups"
    exit 1
  fi
}
#---------------------------------------------------------------------------------------
#   R E P O R T   E N V   V A R I A B L E S   S E T T I N G S
#---------------------------------------------------------------------------------------
reportEnvironmentVariables()
{
  log 'ADMIN: Current environment variables:'
  echo;echo;
  log "  \$LOCALWEBDIR = $LOCALWEBDIR"
  log "  \$LOCALBACKUPDIR = $LOCALBACKUPDIR"
  log "  \$LOCALO2LOGS = $LOCALO2LOGS"
  log "  \$REMOTEPROD = $REMOTEPROD"
  echo;echo;
  ANSWER=`./ask.sh "Return to menu <CR> "`
}
#---------------------------------------------------------------------------------------
#   S T A R T   H E R E
#---------------------------------------------------------------------------------------
clear
echo ""
echo "$version"
echo ""
checkEnvironmentVariables
reportEnvironmentVariables
#---------------------------------------------------------------------------------------
#   M E N U    L O O P
#---------------------------------------------------------------------------------------
while [ 1 ]
do
  menu
  ANSWER=`./ask.sh "Enter a command listed above or X to exit : " "$lastcommand"`
  if [ -z $ANSWER ]
  then
    break
  else
    lastcommand=$ANSWER
    parsecommand $ANSWER
  fi
done
