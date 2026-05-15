#---------------------------------------------------------------------------------------
#   deploy.sh
#---------------------------------------------------------------------------------------
#   Params
#---------------------------------------------------------------------------------------
version="deploy.sh, May 15 207 : 1.02 "
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
  echo "  60 / Deploy React proto to O2switch"
  echo
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
    '60')       deployTarFile
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
  tar cv -f babook.zip -C .. client/dist server/server.js server/services/
  tar tvf babook.zip
#   log "TOSWITCH: Deploy $1 to O2switch DEV"
#   scp $1 $O2USER@$O2HOST:BACKUP/$DATESIGNATURE-FROM-LOCAL-ALLIMAGES.tar.gz
#   log "TOSWITCH: Deploy $1 to O2switch DEV: Done"
#   log "ONSWITCH: Extract PROD images on O2switch DEV"
#   ssh -x "$O2USER@$O2HOST" <<-EOF
#   ls -l ~/BACKUP/*FROM*.gz
#   cd $REMOTEDEV/public
#   tar xvf ~/BACKUP/$DATESIGNATURE-FROM-LOCAL-ALLIMAGES.tar.gz
# EOF
#   log "ONSWITCH: Extract PROD images on O2switch DEV: Done: $1"
}
#---------------------------------------------------------------------------------------
pushREACTAPPTOO2SWITCH() {
  echo
  if [ -z $1 ]
  then
    ANSWER=`./ask.sh "Proceed to copy local PROD images backup on O2switch DEV ? Y/N <CR> " "N"`
  else
    ANSWER='Y'
  fi
  if [ `echo $ANSWER | tr A-Z a-z` == "y" ] 
  then
    echo; ls -l $LOCALBACKUPDIR/*.gz; echo; echo
    # Choose the compressed archive
    GZFILE=""
    while [ "$GZFILE" = "" ]
    do
      echo; GZFILE=`./ask.sh "Which archive file ? "`
      if ! [ -f $GZFILE ]
      then
        echo "Please provide a valid file location "
        echo $GZFILE
        GZFILE=""
      fi
    done
    # Now proceed
    initdir=$(pwd)
    log "TOSWITCH: Copy PROD images backup to O2switch DEV"
    DATESIGNATURE=`date +"%Y-%m-%d"`
    scp $GZFILE $O2USER@$O2HOST:BACKUP/$DATESIGNATURE-FROM-LOCAL-ALLIMAGES.tar.gz
    log "TOSWITCH: Copy PROD images backup to O2switch DEV: Done"
    log "ONSWITCH: Extract PROD images on O2switch DEV"
    ssh -x "$O2USER@$O2HOST" <<-EOF
    ls -l ~/BACKUP/*FROM*.gz
    cd $REMOTEDEV/public
    tar xvf ~/BACKUP/$DATESIGNATURE-FROM-LOCAL-ALLIMAGES.tar.gz
EOF
    echo;
    log "ONSWITCH: Extract PROD images on O2switch DEV: Done: $GZFILE"
    cd $initdir
  fi
}
#---------------------------------------------------------------------------------------
#   C H E C K   A L L   R E Q U I R E D   V A R I A B L E S    A R E    S E T 
#---------------------------------------------------------------------------------------
checkEnvironmentVariables()
{
  log 'ADMIN: Check environment variables'
  echo;echo;
  if [ -z $LOCALWEBDIR ]; then
    log "ERR: \$LOCALWEBDIR not set"
    log "INF: Set it to the location of your web project."
    log "INF: For example, \$HOME/yourporjectroot"
    exit 1
  fi
  if [ -z $LOCALPROCSDIR ]; then
    log "ERR: \$LOCALPROCSDIR not set"
    log "INF: Set it to the location of the admin shell script."
    log "INF: For example, \$HOME/bomerleprocs/local"
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
  echo;echo;
  log 'ADMIN: Current environment variables:'
  echo;echo;
  log "  \$LOCALWEBDIR = $LOCALWEBDIR"
  log "  \$LOCALBACKUPDIR = $LOCALBACKUPDIR"
  log "  \$LOCALPROCSDIR = $LOCALPROCSDIR"
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
#   menu input
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
