import os
import subprocess
import rasterio
from rasterio.warp import calculate_default_transform, reproject, Resampling

BASE_DIR = os.path.dirname(__file__)
TILE_DIR = os.path.join(BASE_DIR, "../../tiles")
DATA_DIR = os.path.join(BASE_DIR, "../../data")

def warp_to_web_mercator(src_path: str, dst_path: str):
    """Warp GeoTIFF to EPSG:3857 (Web Mercator)"""
    with rasterio.open(src_path) as src:
        transform, width, height = calculate_default_transform(
            src.crs, 'EPSG:3857', src.width, src.height, *src.bounds
        )
        kwargs = src.meta.copy()
        kwargs.update({
            'crs': 'EPSG:3857',
            'transform': transform,
            'width': width,
            'height': height
        })

        with rasterio.open(dst_path, 'w', **kwargs) as dst:
            for i in range(1, src.count + 1):
                reproject(
                    source=rasterio.band(src, i),
                    destination=rasterio.band(dst, i),
                    src_transform=src.transform,
                    src_crs=src.crs,
                    dst_transform=transform,
                    dst_crs='EPSG:3857',
                    resampling=Resampling.nearest
                )

def generate_xyz_tiles(geotiff_path: str, layer_name: str, zoom_levels=[12,13,14]):
    """Generate XYZ tiles using gdal2tiles.py"""
    for zoom in zoom_levels:
        output_dir = os.path.join(TILE_DIR, layer_name, str(zoom))
        os.makedirs(output_dir, exist_ok=True)
        cmd = [
            "gdal2tiles.py",
            "-z", str(zoom),
            "-w", "none",  # no HTML
            geotiff_path,
            output_dir
        ]
        subprocess.run(cmd, check=True)
