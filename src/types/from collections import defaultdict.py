from collections import defaultdict

def find_closed_figures():
    # Read the number of line segments
    n = int(input().strip())

    # Initialize graph adjacency list
    graph = defaultdict(list)

    # Set to track unique endpoints
    points = set()

    # Process each line segment
    for _ in range(n):
        x1, y1, x2, y2 = map(int, input().split())
        point1 = (x1, y1)
        point2 = (x2, y2)
        
        # Add endpoints to graph and the set
        graph[point1].append(point2)
        graph[point2].append(point1)
        points.add(point1)
        points.add(point2)

    # Function to perform DFS and detect cycles
    def dfs(node, parent, visited, stack):
        visited.add(node)
        stack.add(node)

        for neighbor in graph[node]:
            if neighbor == parent:
                continue  # Skip the edge to the parent
            if neighbor in stack:
                return True  # Cycle detected
            if neighbor not in visited:
                if dfs(neighbor, node, visited, stack):
                    return True

        stack.remove(node)
        return False

    # Find all connected components and count cycles
    visited = set()
    closed_shapes = 0

    for point in points:
        if point not in visited:
            if dfs(point, None, visited, set()):
                closed_shapes += 1

    # Output the number of closed shapes
    print(closed_shapes)

if __name__ == "__main__":
    find_closed_figures()
