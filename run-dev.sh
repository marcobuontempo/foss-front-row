## QUICKSTART BATCH TO RUN PROJECT

# Start MongoDB container
echo Starting mongodb...
start docker start mongodb

# Start backend server in a new terminal window
echo "Starting backend server..."
start npm run dev --prefix ./backend

# Start frontend server in a new terminal window
echo "Starting frontend server..."
start npm run dev --prefix ./frontend