precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // 時間によって変化するグラデーション
    vec3 color = vec3(0.0);
    color.r = sin(u_time * 2.0 + st.x * 3.14159) * 0.5 + 0.5;
    color.g = sin(u_time * 1.5 + st.y * 3.14159) * 0.5 + 0.5;
    color.b = sin(u_time + (st.x + st.y) * 3.14159) * 0.5 + 0.5;
    
    gl_FragColor = vec4(color, 1.0);
}