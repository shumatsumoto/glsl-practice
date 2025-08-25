precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    float frequency = 5.0;
    
    float checkerX = floor(st.x * frequency);
    float checkerY = floor(st.y * frequency + u_time);

    float checker = mod(checkerX + checkerY, 2.0);

    gl_FragColor = vec4(vec3(checker), 1.0);
}